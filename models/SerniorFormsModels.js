const mongoose = require('mongoose');

const SeniorFormsModelSchema = new mongoose.Schema({
  typeOfApplication: {
    type: String,
    required: true,
    enum: ['New', 'Replacement']
  },
  idNumber: {
    type: Number
  },
  medicineBookletNumber: {
    type: Number
  },
  purchaseDTIbooklet: {
    type: Number
  },
  dateOfApplication: {
    type: Date,
    required: true
  },
  barangay: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  civilStatus: {
    type: String,
    enum: ['single', 'married', 'Other']
  },
  nationality: {
    type: String,
    enum: ['Filipino', 'Other']
  },
  dateOfBirth: {
    type: String // Assuming you want to store it as a string in the format DD/MM.YYYY
  },
  placeOfBirth: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  picture: {
    type: Buffer // Assuming you want to store the image as a buffer
  },
  contactPerson: {
    type: Number,
    required: true
  },
  contactNumber: {
    type: Number,
    required: true
  }
});

const SeniorFormsModels = mongoose.model('SeniorFormsModels', SeniorFormsModelSchema);

module.exports = SeniorFormsModels;
