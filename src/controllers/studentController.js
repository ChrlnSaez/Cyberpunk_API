const Student = require('../models/studentModel');

const generate = require('../helpers/generate');
const verify = require('../helpers/verify');

module.exports.getAllStudents = async (_req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.status(200).send(students);
  } catch (error) {
    console.log('getAllStudents', { error });
  }
};

module.exports.getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) return res.status(400).send({ message: 'Student not found' });

    return res.status(200).send(student);
  } catch (error) {
    console.log('getStudent', { error });
  }
};

module.exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(id, {
      ...req.body,
      role: 'student',
    });

    if (!student) return res.status(400).send({ message: 'Student not found' });

    return res.status(200).send({ message: 'Student updated' });
  } catch (error) {
    console.log('updateStudent', { error });
  }
};

module.exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(id, { isActive: false });

    if (!student) return res.status(400).send('Student not found');

    return res.status(200).send('Student deleted');
  } catch (error) {
    console.log('deleteStudent', { error });
  }
};

module.exports.currentStudent = async (req, res) => {
  try {
    const currStudent = await Student.findById(req.userId);

    if (!currStudent)
      return res.status(401).send({ message: 'Student not authorize' });

    return res.status(200).send(currStudent);
  } catch (error) {
    console.log('currentStudent', { error });
  }
};

module.exports.changePasswordStudent = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmationPassword } = req.body;

    let student = await Student.findById(req.userId);

    if (!student) return res.status(400).send({ message: 'Student not found' });

    const isPasswordValid = await verify.hash(
      currentPassword,
      student.password
    );

    if (!isPasswordValid)
      return res.status(400).send({ message: 'Current password is incorrect' });

    if (newPassword !== confirmationPassword)
      return res.status(400).send({ message: 'Password do not match' });

    student.password = await generate.hash(newPassword);

    await student.save();

    return res.status(200).send({ message: 'Student password changed' });
  } catch (error) {
    console.log('changePasswordStudent', { error });
  }
};
