const { model, Schema } = require('mongoose');

const teacherSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'teacher'],
      default: 'teacher',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Teacher', teacherSchema);
