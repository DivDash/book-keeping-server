const express = require("express");
const BankAccount = require("./schema");
const  { commonEmitter } = require('../events')

const changeStream = BankAccount.watch();

changeStream.on('change', (data) => {
  BankAccount.find((err, doc) => {
    if (err) {
      commonEmitter.emit("bankData", {
        error: err.message
      })
    } else {
      commonEmitter.emit("bankData", doc )
    }
  });
}); 

// Bank Router
const bank = express.Router();

bank.get("/", (req, res) => {
  BankAccount.find((err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

bank.get("/:id", (req, res) => {
  const id = req.params.id;
  BankAccount.findById(id, (err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

bank.post("/create-bank-account", (req, res) => {
  const newAccount = new BankAccount(req.body);
  newAccount
    .save()
    .then(status => {
      res.status(201).json(status);
    })
    .catch(error => {
      res.status(404).send(error.message);
    });
});

bank.put("/update-bank-account/:id", (req, res) => {
  const id = req.params.id;
  BankAccount.findByIdAndUpdate(id, req.body, (err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({success: true});
    }
  });
});

bank.delete("/delete-bank-account/:id", (req, res) => {
  const id = req.params.id;
  BankAccount.findByIdAndRemove(id, (err, status) => {
    if (err) {
      res.status(400).json(err.message);
    } else {
      res.status(200).json({success: true});
    }
  });
});

module.exports.bank = bank;
