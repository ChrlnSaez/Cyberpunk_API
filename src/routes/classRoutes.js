const express = require('express')
const Classroom = require('../models/viewClass')
const { 
    getClass,
    getOneClass, 
    getOneTeacher,
    getSched,
   
} = require('../controllers/classController')

const router = express.Router()


//GET a single classroom
router.get('/:id', getClass)

//GET a single classroom students
router.get('/:id/students', getOneClass)

//get teacher within the classroom
router.get('/:id/teacher', getOneTeacher)

//get schedule of classroom
router.get('/:id/schedule', getSched)



module.exports = router