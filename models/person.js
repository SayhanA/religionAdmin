const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email uniqueness
  },
  status: {
    type: String,
    required: false,
    default: "Active",
  },
  resetToken: String,
  resetTokenExpiration: Date,

  age: {
    type: String, // Keeping it as a string since the format is "22.2.28"
  },
  caste: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Religion",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    createdOn: { type: Date },
    updatedOn: { type: Date },
  },
  company: {
    type: String,
  },
  job: {
    type: String,
  },

  religion: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Religion",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: false },
    createdOn: { type: Date },
    updatedOn: { type: Date },
  },

  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date },
});

module.exports = mongoose.model("Person", userSchema);
