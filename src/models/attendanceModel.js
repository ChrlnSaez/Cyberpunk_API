const { model, Schema } = require('mongoose');

const attendanceSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    classroom: {
      type: Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Present', 'Late'],
      default: 'Present',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Attendance', attendanceSchema);
