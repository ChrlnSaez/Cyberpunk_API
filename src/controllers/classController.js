const { default: mongoose } = require('mongoose')
const Classroom = require('../models/viewClass')
const Teacher = require('../models/teacher')
const Student = require('../models/student')


//get classroom
const getClass = async (req, res) => {
    const { id } = req.params
    
    // const { studId } = Student.findOne({ name: req.params.id})
    
    // console.log('find', studId )
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Classroom does not exist'})
    }

    const classRoom = await Classroom.findById(id)
   

    if(!classRoom){
        return res.status(404).json({error: 'Classroom does not exist'})
    }
    res.status(200).json(classRoom)
    
}

//get students in a classroom
const getOneClass = async (req, res) => {
    const { id } = req.params
    
    // const { studId } = Student.findOne({ name: req.params.id})
    
    // console.log('find', studId )
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Classroom does not exist'})
    }

    const classRoom = await Classroom.findById(id).populate('student')
   

    if(!classRoom){
        return res.status(404).json({error: 'Classroom does not exist'})
    }
    res.status(200).json(classRoom)
    
}

//get teacher within the classroom
const getOneTeacher = async (req, res) => {
    const { id } = req.params
    
  
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Classroom does not exist'})
    }

    const classRoom = await Classroom.findById(id).populate('student')
   

    if(!classRoom){
        return res.status(404).json({error: 'Classroom does not exist'})
    }
    res.status(200).json(classRoom)
    
}


//get teacher within the classroom
const getSched = async (req, res) => {
    const { id } = req.params
    
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Classroom does not exist'})
    }

    const classRoom = await Classroom.findById(id)
   

    if(!classRoom){
        return res.status(404).json({error: 'Classroom does not exist'})
    }
    res.status(200).json(classRoom)
    
}

module.exports ={
    getClass,
    getOneClass,
    getOneTeacher,
    getSched,
   
}