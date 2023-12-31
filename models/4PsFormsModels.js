const mongoose = require('mongoose');

const FourPsFormsModelSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  middlename: {
    type: String
  },
  suffix: {
    type: String
  },
  houseNumber: {
    type: Number,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  barangay: {
    type: String,
    enum: ['San Isidro Norte'],
    required: true
  },
  cityMunicipality: {
    type: String,
    required: true
  },
  province: {
    type: String,
    enum: ['Binmaley'],
    required: true
  },
  region: {
    type: String,
    enum: ['Region 1'],
    required: true
  },
  postal: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  }
});

const FourPsFormsModel = mongoose.model('4PsFormsModel', FourPsFormsModelSchema);

module.exports = FourPsFormsModel;
