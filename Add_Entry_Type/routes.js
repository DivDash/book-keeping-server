const express = require("express");
const EntryType = require("./schema");
const socket_io = require('socket.io');
var io = socket_io();

const changeStream = EntryType.watch();

changeStream.on('change', (change) => {
    console.log(change); // You could parse out the needed info and send only that data. 
    io.emit('changeData', change);
}); 

// Entry Type Router
const entryType = express.Router();

entryType.get("/", (req, res) => {
    EntryType.find((err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

entryType.get("/:id", (req, res) => {
  const id = req.params.id;
  EntryType.findById(id, (err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

entryType.post("/create-entry-type", (req, res) => {
  const newType = new EntryType(req.body);
  newType
    .save()
    .then(status => {
      res.status(201).json(status);
    })
    .catch(error => {
      res.status(404).send(error.message);
    });
});

entryType.put("/update-entry-type/:id", (req, res) => {
  const id = req.params.id;
  EntryType.findByIdAndUpdate(id, req.body, (err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({success: true});
    }
  });
});

entryType.delete("/delete-entry-type/:id", (req, res) => {
  const id = req.params.id;
  EntryType.findByIdAndRemove(id, (err, status) => {
    if (err) {
      res.status(400).json(err.message);
    } else {
      res.status(200).json({success: true});
    }
  });
});

module.exports.entryType = entryType;
