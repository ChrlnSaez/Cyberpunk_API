const express = require('express');

const {
    getRecord,
    getRecords,
    createRecord,
    deleteRecord,
    updateRecord
} = require('../controllers/zoomrecController');

// Routes zoom recorded meetings
router.get('/recorded-meetings/:id', getRecord);
router.get('/recorded-meetings/', getRecords);
router.post('/recorded-meetings/', createRecord);
router.delete('/recorded-meetings/:id', deleteRecord);
router.patch('/recorded-meetings/:id', updateRecord);