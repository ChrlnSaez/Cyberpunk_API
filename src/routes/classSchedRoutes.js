const express = require('express');
const {
    getClassSched,
    updateClassSched
} = require('../controllers/classSchedController');

const router = Router();

router.get('./class-schedule/', getClassSched);
router.patch('./class-schedule/', updateClassSched);

module.exports = router;

