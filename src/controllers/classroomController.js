const Classroom = require('../models/classroomModel');

module.exports.getAllClassrooms = async (_req, res) => {
  try {
    const classrooms = await Classroom.find()
      .sort({ createdAt: -1 })
      .populate('students')
      .populate('teacher');
    return res.status(200).send(classrooms);
  } catch (error) {
    console.log('getAllClassrooms', { error });
  }
};

module.exports.getClassroom = async (req, res) => {
  try {
    const { id } = req.params;

    const classroom = await Classroom.findById(id)
      .populate('students')
      .populate('teacher')
      .sort({ createdAt: -1 });

    if (!classroom)
      return res.status(400).send({ message: 'Classroom not found' });

    return res.status(200).send(classroom);
  } catch (error) {
    console.log('getClassroom', { error });
  }
};

module.exports.getStudentClassroom = async (req, res) => {
  try {
    const { studentId } = req.body;

    const classroom = await Classroom.find({ students: studentId })
      .populate('students')
      .populate('teacher')
      .sort({ createdAt: -1 });

    if (!classroom)
      return res.status(400).send({ message: 'Classroom not found' });

    return res.status(200).send(classroom);
  } catch (error) {
    console.log('getStudentClassroom', { error });
  }
};

module.exports.getTeacherClassroom = async (req, res) => {
  try {
    const { teacherId } = req.body;

    const classroom = await Classroom.find({ teacher: teacherId })
      .populate('students')
      .populate('teacher')
      .sort({ createdAt: -1 });

    if (!classroom)
      return res.status(400).send({ message: 'Classroom not found' });

    return res.status(200).send(classroom);
  } catch (error) {
    console.log('getTeacherClassroom', { error });
  }
};

module.exports.getCurrentClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.find({
      ...(req.userRole === 'student' && { students: req.userId }),
      ...(req.userRole === 'teacher' && { teacher: req.userId }),
    })
      .populate('students')
      .populate('teacher')
      .sort({ createdAt: -1 });

    if (!classroom)
      return res.status(400).send({ message: 'Classroom not found' });

    return res.status(200).send(classroom);
  } catch (error) {
    console.log('getCurrentClassroom', { error });
  }
};

module.exports.updateClassroom = async (req, res) => {
  try {
    const { id } = req.params;

    const classroom = await Classroom.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (!classroom)
      return res.status(400).send({ message: 'Classroom not found' });

    await classroom.save();

    return res.status(200).send({ message: 'Classroom updated' });
  } catch (error) {
    console.log('updateClassroom', { error });
  }
};

module.exports.createClassroom = async (req, res) => {
  try {
    const { students, teacher, name } = req.body;

    const isClassroomExist = await Classroom.findOne({ name });

    if (isClassroomExist)
      return res.status(400).send({ message: 'Classroom already exists' });

    const classroom = await Classroom.create({
      students,
      teacher,
      name,
    });

    await classroom.save();

    res.status(200).json(classroom);
  } catch (error) {
    console.log('createClassroom', { error });
  }
};

module.exports.addAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignment } = req.body;

    const currClassroom = await Classroom.findById(id);

    if (!currClassroom)
      return res.status(400).send({ message: 'Classroom not found' });

    if (currClassroom.assignments.includes(assignment))
      return res
        .status(400)
        .send({ message: 'Assignment already in classroom' });

    const classroom = await Classroom.updateOne(
      { _id: id },
      {
        $push: { assignments: assignment },
      }
    );

    if (!classroom)
      return res.status(400).send({ message: 'Classroom not found' });

    return res
      .status(200)
      .send({ message: `Assignment added to classroom ${id}` });
  } catch (error) {
    console.log('addAssignment', { error });
  }
};

module.exports.addStudentClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;

    const currClassroom = await Classroom.findById(id);

    if (!currClassroom)
      return res.status(400).send({ message: 'Classroom not found' });

    if (currClassroom.students.includes(studentId))
      return res.status(400).send({ message: 'Student already in classroom' });

    const classroom = await Classroom.updateOne(
      { _id: id },
      { $push: { students: studentId } }
    );

    if (!classroom)
      return res.status(400).send({ message: 'Classroom not found' });

    return res
      .status(200)
      .send({ message: `Student added to classroom ${id}` });
  } catch (error) {
    console.log('addStudentClassroom', { error });
  }
};

module.exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignment } = req.body;

    const currClassroom = await Classroom.findById(id);

    if (!currClassroom)
      return res.status(400).send({ message: 'Classroom not found' });

    if (!currClassroom.assignments.includes(assignment))
      return res
        .status(400)
        .send({ message: 'Assignment is not in classroom' });

    const classroom = await Classroom.updateOne(
      { _id: id },
      {
        $pull: { assignments: assignment },
      }
    );

    if (!classroom)
      return res.status(400).send({ message: 'Classroom not found' });

    return res
      .status(200)
      .send({ message: `Assignment removed from classroom ${id}` });
  } catch (error) {
    console.log('deleteAssignment', { error });
  }
};

module.exports.deleteStudentClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;

    const currClassroom = await Classroom.findById(id);

    if (!currClassroom)
      return res.status(400).send({ message: 'Classroom not found' });

    if (!currClassroom.students.includes(studentId))
      return res.status(400).send({ message: 'Student is not in classroom' });

    const classroom = await Classroom.updateOne(
      { _id: id },
      { $pull: { students: studentId } }
    );

    if (!classroom)
      return res.status(400).send({ message: 'Classroom not found' });

    return res
      .status(200)
      .send({ message: `Student removed from classroom ${id}` });
  } catch (error) {
    console.log('deleteStudentClassroom', { error });
  }
};

module.exports.deleteClassroom = async (req, res) => {
  try {
    const { id } = req.params;

    const classroom = await Classroom.findByIdAndUpdate(id, {
      isActive: false,
    });

    if (!classroom) return res.status(400).send('Classroom not found');

    return res.status(200).send('Classroom deleted');
  } catch (error) {
    console.log('deleteClassroom', { error });
  }
};
