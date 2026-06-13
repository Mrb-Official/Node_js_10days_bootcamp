const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: false
  },
  work: {
    type: String,
    enum: ["schef", "waiter", "manager"],
    required: true
  }
});

const person = mongoose.model('person', personSchema);
module.exports = person;