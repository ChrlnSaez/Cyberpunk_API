const mongoose = require('mongoose');

const Schema = mongoose.Schema

const teacherSchema = new Schema(
  {
    student: {
        type: Schema.Types.ObjectId, ref: "student",
    },
    batch: {
        type: String,
        required: true
    },
    activities: {
        type: String,
        enum: ["link", "filetype", "image"],
        default: "link",
    },
    course: {
        type: String,
        required: true,
    },
  },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Teacher', teacherSchema);