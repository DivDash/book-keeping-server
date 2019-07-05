const express = require("express");
const JournalEntry = require("./schema");

// journalEntry Router
const journalEntry = express.Router();

journalEntry.get("/", (req, res) => {
    JournalEntry.find((err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

journalEntry.get("/:id", (req, res) => {
  const id = req.params.id;
  JournalEntry.findById(id, (err, doc) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(200).json(doc);
    }
  });
});

journalEntry.post("/create-journal-entry-account", (req, res) => {
  const newEntry = new JournalEntry(req.body);
  newEntry
    .save()
    .then(status => {
      res.status(201).json(status);
    })
    .catch(error => {
      res.status(404).send(error.message);
    });
});

journalEntry.put("/update-journal-entry-account/:id", (req, res) => {
  const id = req.params.id;
  JournalEntry.findByIdAndUpdate(id, req.body, (err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({success: true});
    }
  });
});

journalEntry.delete("/delete-journal-entry-account/:id", (req, res) => {
  const id = req.params.id;
  JournalEntry.findByIdAndRemove(id, (err, status) => {
    if (err) {
      res.status(400).json(err.message);
    } else {
      res.status(200).json({success: true});
    }
  });
});

module.exports.journalEntry = journalEntry;
