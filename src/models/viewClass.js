const { model, Schema, default: mongoose } = require('mongoose');

const classRoomSchema = new Schema(
  {
    batchName: {
      type: String,
      required: true,
    },
    teacher: {
        type: mongoose.Types.ObjectId, 
        ref: 'Teacher'
    },
    student: [{ type: mongoose.Types.ObjectId, 
    ref: 'Student' }],

    schedule: {
      type: String,
      required: true,
     
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = model('Classroom', classRoomSchema);
