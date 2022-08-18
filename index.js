const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const activityRoutes = require('./src/routes/actRoutes');
const lessonMaterial = require('./src/lessmatRoutes/');
const zoomRecords = require('./src/routes/zoomrecRoutes');
const classroomAttendance = require('./src/routes/viewAttendanceRoutes')

const teacher = express();

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
  await mongoose.connect('mongodb://localhost:27017/cyberpunk');
  console.log('MongoDB Connected');

  app.get('/', (req, res) => {
    return res.send({ message: 'Hello World' });
  });

  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);
  teacher.use('/api/activity', activityRoutes);
  teacher.use('/api/lesson_material', lessonMaterial);
  teacher.use('/api/recorded-meetings', zoomRecords);
  teacher.use('/api/classroom-attendance', classroomAttendance);

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
