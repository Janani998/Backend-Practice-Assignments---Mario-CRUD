const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here
app.get("/mario", (req, res) => {
  marioModel.find().then((marios) => res.send(marios));
});

app.get("/mario/:id", (req, res) => {
  const id = req.params.id;
  marioModel
    .find({ _id: id })
    .then((marios) => marios.map((mario) => res.send(mario)))
    .catch((error) => res.status(400).send({ message: error.message }));
});

app.post("/mario", (req, res) => {
  const { name, weight } = req.body;
  const mario = new marioModel({
    name: name,
    weight: weight
  });
  mario
    .save()
    .then((mario) => res.status(201).send(mario))
    .catch((error) =>
      res.status(400).send({ message: "either name or weight is missing" })
    );
});

app.patch("/mario/:id", (req, res) => {
  const id = req.params.id;
  marioModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((mario) => res.send(mario))
    .catch((error) => res.status(400).send({ message: error.message }));
});

app.delete("/mario/:id", (req, res) => {
  const id = req.params.id;
  marioModel
    .findByIdAndDelete(id)
    .then((mario) => res.status(200).send({ message: "character deleted" }))
    .catch((error) => res.status(400).send({ message: error.message }));
});

module.exports = app;
