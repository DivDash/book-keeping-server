const express = require("express");
const Voucher = require("./schema");
const  { commonEmitter } = require('../events')

const changeStream = Voucher.watch();

changeStream.on('change', (data) => {
  Voucher.find((err, doc) => {
    if (err) {
      commonEmitter.emit("voucherData", {
        error: err.message
      })
    } else {
      commonEmitter.emit("voucherData", doc )
    }
  });
}); 


// Voucher Router
const voucher = express.Router();

voucher.get("/", (req, res) => {
    Voucher.find((err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

voucher.get("/:id", (req, res) => {
  const id = req.params.id;
  Voucher.findById(id, (err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

voucher.post("/create-voucher", (req, res) => {
  const newEntry = new Voucher(req.body);
  newEntry
    .save()
    .then(status => {
      res.status(201).json(status);
    })
    .catch(error => {
      res.status(404).send(error.message);
    });
});

voucher.put("/update-voucher/:id", (req, res) => {
  const id = req.params.id;
  Voucher.findByIdAndUpdate(id, req.body, (err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({success: true});
    }
  });
});

voucher.delete("/delete-voucher/:id", (req, res) => {
  const id = req.params.id;
  Voucher.findByIdAndRemove(id, (err, status) => {
    if (err) {
      res.status(400).json(err.message);
    } else {
      res.status(200).json({success: true});
    }
  });
});

module.exports.voucher = voucher;
