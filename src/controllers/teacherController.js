const Student = require('../models/teacherModel');

module.exports.getAllTeachers = async (_req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    return res.status(200).send(teachers);
  } catch (error) {
    console.log('getAllTeachers', { error });
  }
};

module.exports.getTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);

    if (!teacher) return res.status(400).send({ message: 'Teacher not found' });

    return res.status(200).send(teacher);
  } catch (error) {
    console.log('getTeacher', { error });
  }
};

module.exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByIdAndUpdate(id, {
      ...req.body,
      role: 'teacher',
    });

    if (!teacher) return res.status(400).send({ message: 'Teacher not found' });

    return res.status(200).send({ message: 'Teacher updated' });
  } catch (error) {
    console.log('updateTeacher', { error });
  }
};

module.exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByIdAndUpdate(id, { isActive: false });

    if (!teacher) return res.status(400).send('Teacher not found');

    return res.status(200).send('Teacher deleted');
  } catch (error) {
    console.log('deleteTeacher', { error });
  }
};

module.exports.currentTeacher = async (req, res) => {
  try {
    const currTeacher = await Teacher.findById(req.userId);

    if (!currTeacher)
      return res.status(401).send({ message: 'Teacher not authorize' });

    return res.status(200).send(currTeacher);
  } catch (error) {
    console.log('currentTeacher', { error });
  }
};
