const nodemailer = require('nodemailer');

module.exports = () => {
  const client = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'testemailtest890@gmail.com',
      pass: 'tyceknlmwbpxvwtd',
    },
  });

  return client;
};
