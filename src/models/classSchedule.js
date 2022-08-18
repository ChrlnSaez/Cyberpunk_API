const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classSchedSchema = new Schema(
  {
    course: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true
    }
  }
);

module.exports = mongoose.model('ClassSchedule', teacherSchema);