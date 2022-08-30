const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');

const generate = require('../helpers/generate');
const verify = require('../helpers/verify');

const short = require('short-uuid');
const client = require('../helpers/client');

module.exports.studentRegisterController = async (req, res) => {
  let { email, firstName, lastName } = req.body;
  const isEmailExist = await Student.findOne({ email });

  if (isEmailExist)
    return res.status(400).send({ error: 'Student already exist ' });

  const shortId = short();

  let password = shortId.new();

  const hashPassword = await generate.hash(password);

  const student = new Student({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  await student.save();

  const fullName = `${student.firstName} ${student.lastName}`;

  client().sendMail({
    from: 'testemailtest890@gmail.com',
    to: student.email,
    subject: 'Student Credentials',
    text: `Hello ${fullName}\nYour password for your account: ${student.email} is ${password}.`,
  });

  return res.status(201).send({ message: 'Student Created' });
};

module.exports.studentLoginController = async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (!student)
    return res.status(400).send({ error: 'Student does not exist' });

  const isPasswordValid = await verify.hash(password, student.password);

  if (!isPasswordValid)
    return res.status(400).send({ error: 'Credentials are invalid' });

  const token = generate.jwt({ id: student._id, role: student.role });

  return res.status(200).send({ message: 'Student is now logged in', token });
};

//Teacher Authentication
module.exports.teacherRegisterController = async (req, res) => {
  let { email, password, firstName, lastName } = req.body;
  const isEmailExist = await Teacher.findOne({ email });

  if (isEmailExist)
    return res.status(400).send({ error: 'Teacher already exist ' });

  password = await generate.hash(password);

  const teacher = new Teacher({
    firstName,
    lastName,
    email,
    password,
  });

  await teacher.save();

  return res.status(201).send({ message: 'Teacher Created' });
};

module.exports.teacherLoginController = async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({ email });

  if (!teacher)
    return res.status(400).send({ error: 'Teacher does not exist' });

  const isPasswordValid = await verify.hash(password, teacher.password);

  if (!isPasswordValid)
    return res.status(400).send({ error: 'Credentials are invalid' });

  const token = generate.jwt({ id: teacher._id, role: teacher.role });

  return res.status(200).send({ message: 'Teacher is now logged in', token });
};
