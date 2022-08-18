const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ViewAttendance = new Schema (
    {
        course: {
            type: Schema.Types.ObjectId, ref: "courseID"
        },
        batch: {
            type: Schema.Types.ObjectId, ref: "batchID"    
        },
        attendance: {
            type: Schema.Types.Date, ref: "studentID"
        }
    }
);
const attendanceViewer = mongoose.model("AttendanceView", ViewAttendance);

module.exports = attendanceViewer;