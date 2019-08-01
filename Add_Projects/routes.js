const express = require("express");
const Project = require("./schema");
const  { commonEmitter } = require('../events')

const changeStream = Project.watch();

changeStream.on('change', (data) => {
  Project.find((err, doc) => {
    if (err) {
      commonEmitter.emit("projectData", {
        error: err.message
      })
    } else {
      commonEmitter.emit("projectData", doc )
    }
  });
}); 

// Add project Router
const project = express.Router();

project.get("/", (req, res) => {
  Project.find((err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

project.get("/:id", (req, res) => {
  const id = req.params.id;
  Project.findById(id, (err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

project.post("/create-project", (req, res) => {
  const newEntry = new Project(req.body);
  newEntry
    .save()
    .then(status => {
      res.status(201).json(status);
    })
    .catch(error => {
      res.status(404).send(error.message);
    });
});

project.put("/update-project/:id", (req, res) => {
  const id = req.params.id;
  Project.findByIdAndUpdate(id, req.body, (err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({success: true});
    }
  });
});

project.delete("/delete-project/:id", (req, res) => {
  const id = req.params.id;
  Project.findByIdAndRemove(id, (err, status) => {
    if (err) {
      res.status(400).json(err.message);
    } else {
      res.status(200).json({success: true});
    }
  });
});

module.exports.project = project;
