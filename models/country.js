'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: {type: String, required: true},
  countryCode: {type: String, required: true},
  visaFree: {
    type: [String],
    default: []
  },
  visaOnArrival: {
    type: [String],
    default: []
  },
  bannedFrom: {
    type: [String],
    default: []
  }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
