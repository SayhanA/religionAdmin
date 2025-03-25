const Person = require("../models/person");
const Route = require("express").Router();

Route.get("/", async (req, res) => {
  try {
    const persons = await Person.find(); // Fetch all persons
    res.status(200).json(persons);
  } catch (err) {
    console.error("Error fetching persons:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

Route.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const person = await Person.findOne({_id:id});

    if (person) {
      res.status(200).json(person);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

Route.post("/", async (req, res) => {
  try {
    const newPerson = new Person({ ...req.body });
    const savedPerson = await newPerson.save();

    res.status(201).json({
      message: "Person added successfully",
      person: savedPerson,
    });
  } catch (err) {
    console.error("Error saving person:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

Route.delete("/", async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.query.id);

    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    res
      .status(200)
      .json({ message: "Person deleted successfully", person: deletedPerson });
  } catch (err) {
    console.error("Error deleting person:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

Route.put("", async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.query.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    res
      .status(200)
      .json({ message: "Person updated successfully", person: updatedPerson });
  } catch (err) {
    console.error("Error updating person:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = Route;
