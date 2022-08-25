const { model, Schema } = require('mongoose');

const classroomSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    name: {
      type: String,
      required: true,
    },
    assignments: [{ type: String }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Classroom', classroomSchema);
