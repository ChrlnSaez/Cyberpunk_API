const User = require('../models/user');

const generate = require('../helpers/generate');
const verify = require('../helpers/verify');

module.exports.registerController = async (req, res) => {
  let { email, password, firstName, lastName, role } = req.body;
  const isEmailExist = await User.findOne({ email });

  if (isEmailExist)
    return res.status(400).send({ error: 'User already exist ' });

  password = await generate.hash(password);

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    ...(role && { role }),
  });

  await user.save();

  return res.status(201).send({ message: 'User Created' });
};

module.exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send({ error: 'User does not exist' });

  const isPasswordValid = await verify.hash(password, user.password);

  if (!isPasswordValid)
    return res.status(400).send({ error: 'Credentials are invalid' });

  const token = generate.jwt({ id: user._id, role: user.role });

  return res.status(200).send({ message: 'User is now logged in', token });
};
