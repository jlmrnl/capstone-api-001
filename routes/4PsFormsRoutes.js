const express = require('express');
const router = express.Router();
const FourPsFormsModel = require('../models/4PsFormsModels');

// Create a new 4Ps form
router.post('/submit', async (req, res) => {
  try {
    const formData = req.body;
    const newForm = new FourPsFormsModel(formData);
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all 4Ps forms
router.get('/forms', async (req, res) => {
  try {
    const forms = await FourPsFormsModel.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific 4Ps form by ID
router.get('/forms/:id', async (req, res) => {
  try {
    const form = await FourPsFormsModel.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific 4Ps form by ID
router.put('/forms/:id', async (req, res) => {
  try {
    const form = await FourPsFormsModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific 4Ps form by ID
router.delete('/forms/:id', async (req, res) => {
  try {
    const form = await FourPsFormsModel.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
