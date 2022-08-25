const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const studentRoutes = require('./src/routes/studentRoutes');
const authRoutes = require('./src/routes/authRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const classRoomRoutes = require('./src/routes/classroomRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');

(async () => {
  const app = express();

  // Middlewares
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // For development use local mongodb instance instead of Atlas
  await mongoose.connect(
    'mongodb+srv://chrlnsaez:PpbcIWCiFaShPikc@cyberpunk.wxbpk6r.mongodb.net/?retryWrites=true&w=majority'
  );
  console.log('MongoDB Connected');

  app.get('/', (_req, res) => {
    return res.send({ message: 'Hello World' });
  });

  app.use('/api/student', studentRoutes);
  app.use('/api/teacher', teacherRoutes);
  app.use('/api/classroom', classRoomRoutes);
  app.use('/api/attendance', attendanceRoutes);
  app.use('/api/auth', authRoutes);

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
