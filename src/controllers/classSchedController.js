const ClassSchedule = require('../models/classSchedule');
const mongoose = require('mongoose');

// Get All Class Schedule
const getClassSched = async (req, res) => {
    const classSched = await ClassSchedule.find({}).sort({ createdAt: -1 })

    res.status(200).json(classSched)
};

// Update Class Schedule
const updateClassSched = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const classSched = await ClassSchedule.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!classSched) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(classSched)
};

module.exports = {
    getClassSched,
    updateClassSched
}