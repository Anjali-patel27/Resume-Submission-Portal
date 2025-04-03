const express = require('express');
const { uploadResume, getResumes, deleteResume } = require('../controllers/resumeController');
const router = express.Router();

router.post('/', uploadResume);
router.get('/', getResumes);
router.delete('/:id', deleteResume);

module.exports = router;