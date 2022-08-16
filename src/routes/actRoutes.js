const { Router } = require('express');
const {
    getActivities,
    getActivity,
    createActivity,
    deleteActivity,
    updateActivity
    } = require('../controllers/activityController');

const router = Router();

// Routes for Activities
router.get('/activity/', getActivities);
router.get('/activity/:id', getActivity);
router.post('/activity/', createActivity);
router.delete('/activity/:id', deleteActivity);
router.patch('/activity/:id', updateActivity);

module.exports = router;