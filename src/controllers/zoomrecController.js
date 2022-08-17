const Recordedzoom = require('../models/recordedzoom');
const mongoose = require('mongoose');

// get all records
const getRecords = async (req, res) => {
    const records = await Recordedzoom.find({}).sort({ createdAt: -1 })
    res.status(200).json(records);
};

// get a single workout
const getRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such recorded zoom' })
    }
    const record = await Workout.findById(id)
    if (!record) {
        return res.status(400).json({ error: 'No such recorded zoom' })
    }
    res.status(200).json(record)
};

// create/upload new recorded zoom
const createRecord = async (req, res) => {
    const { topic, link } = req.body

    // add document to database
    try {
        const record = await Recordedzoom.create({ topic, link })
        res.status(200).json(record)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// delete a recorded zoom data
const deleteRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such recorded zoom' })
    }
    const record = await Recordedzoom.findOneAndDelete({ _id: id })
    if (!record) {
        return res.status(400).json({ error: 'No such recorded zoom' })
    }
    res.status(200).json(record)
};

// update a uploaded recorded zoom, topic, link
const updateRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such recorded zoom' })
    }
    const record = await Recordedzoom.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!record) {
        return res.status(400).json({ error: 'No such recorded zoom' })
    }
    res.status(200).json(record)
}

module.exports = {
    getRecord,
    getRecords,
    createRecord,
    deleteRecord,
    updateRecord
};

