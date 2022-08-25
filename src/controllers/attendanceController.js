const Student = require('../models/studentModel');
const Classroom = require('../models/classroomModel');
const Attendance = require('../models/attendanceModel');
const nodemailer = require('nodemailer');

const isToday = require('date-fns/isToday');
const format = require('date-fns/format');

module.exports.getAllAttendances = async (_req, res) => {
  try {
    const attendance = await Attendance.find()
      .sort({ createdAt: -1 })
      .populate('student')
      .populate('classroom');

    return res.status(200).send(attendance);
  } catch (error) {
    console.log('getAllAttendances', { error });
  }
};

module.exports.getAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findById(id)
      .populate('student')
      .populate('classroom');

    if (!attendance)
      return res.status(400).send({ message: 'Attendance not found' });

    return res.status(200).send(attendance);
  } catch (error) {
    console.log('getAttendace', { error });
  }
};

module.exports.getStudentsAttendances = async (req, res) => {
  try {
    const { studentId } = req.body;

    const attendance = await Attendance.find({ student: studentId })
      .populate('student')
      .populate('classroom')
      .sort({ createdAt: -1 });

    if (!attendance)
      return res.status(400).send({ message: 'Student does not exists' });

    return res.status(200).send(attendance);
  } catch (error) {
    console.log('getStudentsAttendances', { error });
  }
};

module.exports.getCurrentStudentAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.userId })
      .populate('student')
      .populate('classroom')
      .sort({ createdAt: -1 });

    if (!attendance)
      return res.status(400).send({ message: 'Student does not exists' });

    return res.status(200).send(attendance);
  } catch (error) {
    console.log('getCurrentStudentAttendance', { error });
  }
};

module.exports.getClassroomAttendances = async (req, res) => {
  try {
    const { classroomId } = req.body;

    const attendance = await Attendance.find({ classroom: classroomId })
      .populate('student')
      .populate('classroom')
      .sort({ createdAt: -1 });

    if (!attendance)
      return res.status(400).send({ message: 'Classroom does not exists' });

    return res.status(200).send(attendance);
  } catch (error) {
    console.log('getClassroomAttendances', { error });
  }
};

module.exports.createAttendance = async (req, res) => {
  try {
    const student = await Student.findById(req.userId);

    const classroom = await Classroom.findOne({ students: student.id });

    if (!classroom)
      return res
        .status(400)
        .send({ message: 'Student is not in the classroom' });

    const currAttendance = await Attendance.find({
      student: student.id,
    }).sort({
      createdAt: -1,
    });

    if (currAttendance.length > 0) {
      const loggedTodayAttendance = isToday(currAttendance[0].createdAt);

      if (loggedTodayAttendance)
        return res
          .status(400)
          .send({ message: 'Already logged attendance for today' });
    }

    const attendance = await Attendance.create({
      student: student.id,
      classroom: classroom.id,
    });

    const attendanceDate = new Date(attendance.createdAt);

    if (attendanceDate.getHours() >= 7) {
      attendance.status = 'Late';
    } else {
      attendance.status = 'Present';
    }

    await attendance.save();

    const client = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'testemailtest890@gmail.com',
        pass: 'tyceknlmwbpxvwtd',
      },
    });

    const popStudent = await Attendance.populate(attendance, {
      path: 'student',
    });

    const fullName = `${popStudent.student.firstName} ${popStudent.student.lastName}`;
    const today = format(attendance.createdAt, 'MMMM dd yyyy');
    const status = attendance.status;

    client.sendMail({
      from: 'testemailtest890@gmail.com',
      to: popStudent.student.email,
      subject: 'Attedance Status',
      text: `Hello ${fullName}\nYour attendance status for ${today} is ${status}.`,
    });

    return res.status(200).send({ message: 'Attendance created' });
  } catch (error) {
    console.log('createAttendace', { error });
  }
};
