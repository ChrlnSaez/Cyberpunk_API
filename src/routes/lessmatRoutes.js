const { Router } = require("express");
const express = require("express");

const {
    getLessonMaterial,
    getLessonMaterials,
    createLessonMaterial,
    deleteLessonMaterial,
    updateLessonMaterial
} = require('../controllers/lessmatController');

const router = Router();

// Routes for Lesson Materials
router.get('/lesson_material/', getLessonMaterial);
router.get('/lesson_material/:id', getLessonMaterials);
router.post('/lesson_material/', createLessonMaterial);
router.delete('/lesson_material/:id', deleteLessonMaterial);
router.patch('/lesson_material/:id', updateLessonMaterial);

module.exports = router;