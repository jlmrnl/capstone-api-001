const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const SeniorFormsModels = require('../models/SerniorFormsModels');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/'; // Specify the directory to store the files
    fs.mkdir(uploadPath, { recursive: true }).then(() => {
      cb(null, uploadPath);
    });
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Create a new form entry with image upload
router.post('/submit', upload.single('picture'), async (req, res) => {
  try {
    const formData = req.body;
    if (req.file) {
      // If an image is uploaded, store the file path
      formData.picture = path.join('uploads', req.file.filename);
    }

    const newFormEntry = await SeniorFormsModels.create(formData);
    res.status(201).json(newFormEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all form entries
router.get('/entries', async (req, res) => {
  try {
    const allFormEntries = await SeniorFormsModels.find();
    res.status(200).json(allFormEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific form entry by ID
router.get('/entries/:id', async (req, res) => {
  try {
    const formEntry = await SeniorFormsModels.findById(req.params.id);
    if (!formEntry) {
      return res.status(404).json({ error: 'Form entry not found' });
    }
    res.status(200).json(formEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a form entry by ID
router.put('/entries/:id', async (req, res) => {
  try {
    const updatedFormEntry = await SeniorFormsModels.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFormEntry) {
      return res.status(404).json({ error: 'Form entry not found' });
    }
    res.status(200).json(updatedFormEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a form entry by ID
router.delete('/entries/:id', async (req, res) => {
  try {
    const deletedFormEntry = await SeniorFormsModels.findByIdAndDelete(req.params.id);
    if (!deletedFormEntry) {
      return res.status(404).json({ error: 'Form entry not found' });
    }
    res.status(200).json({ message: 'Form entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
