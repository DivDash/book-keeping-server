const express = require("express");
const NonProfit = require("./schema");
const socket_io = require('socket.io');
var io = socket_io();

const changeStream = NonProfit.watch();

changeStream.on('change', (change) => {
    console.log(change); // You could parse out the needed info and send only that data. 
    io.emit('changeData', change);
}); 



// Add NonProfit Router
const nonProfit = express.Router();

nonProfit.get("/", (req, res) => {
  NonProfit.find((err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

nonProfit.get("/:id", (req, res) => {
  const id = req.params.id;
  NonProfit.findById(id, (err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

nonProfit.post("/add-non-profit", (req, res) => {
  const newEntry = new NonProfit(req.body);
  newEntry
    .save()
    .then(status => {
      res.status(201).json(status);
    })
    .catch(error => {
      res.status(404).send(error.message);
    });
});

nonProfit.put("/update-non-profit/:id", (req, res) => {
  const id = req.params.id;
  NonProfit.findByIdAndUpdate(id, req.body, (err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({success: true});
    }
  });
});

nonProfit.delete("/delete-non-profit/:id", (req, res) => {
  const id = req.params.id;
  NonProfit.findByIdAndRemove(id, (err, status) => {
    if (err) {
      res.status(400).json(err.message);
    } else {
      res.status(200).json({success: true});
    }
  });
});

module.exports.nonProfit = nonProfit;
