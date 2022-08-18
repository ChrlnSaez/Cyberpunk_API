const Activities = require('../models/activity');
const mongoose = require('mongoose');

// get all activities
const getActivities = async (req, res) => {
    const activity = await Activities.find({}).sort({ createdAt: -1 })
    res.status(200).json(activity);
};

// get single activity
const getActivity = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such activity' })
    }
    const activity = await Activities.findById(id)
    if (!activity) {
        return res.status(400).json({ error: 'No such activity' })
    }
    res.status(200).json(activity)
};

// create a new assignment
const createActivity = async (req, res) => {
    const { student, batch, activities, course } = req.body

    // add doc to db
    try {
        const activity = await Activities.create({ student, batch, activities, course })
        res.status(200).json(activity)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// delete a activity
const deleteActivity = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such activity' })
    }
    const activity = await Activities.findOneAndDelete({ _id: id })
    if (!activity) {
        return res.status(400).json({ error: 'No such activity' })
    }
    res.status(200).json(activity)
};

// update a activity
const updateActivity = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such activity' })
    }
    const activity = await Activities.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!activity) {
        return res.status(400).json({ error: 'No such activity' })
    }
    res.status(200).json(activity)
};

module.exports = {
    getActivities,
    getActivity,
    createActivity,
    deleteActivity,
    updateActivity
}