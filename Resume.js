const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;