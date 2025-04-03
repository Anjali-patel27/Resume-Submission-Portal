const Resume = require('../models/Resume');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('resume');

exports.uploadResume = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'raw' },
      async (error, result) => {
        if (error) return res.status(500).json({ error: 'Upload failed' });

        const newResume = new Resume({
          name: req.body.name,
          resumeUrl: result.secure_url,
        });

        await newResume.save();
        res.status(201).json(newResume);
      }
    );

    req.file.stream.pipe(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};