const { model, Schema } = require('mongoose');

const teacherSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Teacher', teacherSchema);
