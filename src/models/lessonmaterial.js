const mongoose = require('mongoose');

const Schema = mongoose.Schema

const LessonMaterial = new Schema(
  {
    student: {
        type: Schema.Types.ObjectId, ref: "student",
    },
    batch: {
        type: String,
        enum: ["Batch 1", "Batch 2", "Batch 3"],
        required: true
    },
    lessonmaterials: {
        type: String,
        enum: ["video", "pdf", "audio"],
    },
    isDone: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
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

module.exports = mongoose.model('LessonMaterial', teacherSchema);