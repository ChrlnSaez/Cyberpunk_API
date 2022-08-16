const express = require("express");

const {
    getLessonMaterial,
    getLessonMaterials,
    createLessonMaterial,
    deleteLessonMaterial,
    updateLessonMaterial
} = require('../controllers/lessmatController');

// Routes for Lesson Materials
router.get('/', getLessonMaterial);
router.get('/:id', getLessonMaterials);
router.post('/', createLessonMaterial);
router.delete('/:id', deleteLessonMaterial);
router.patch('/:id', updateLessonMaterial);