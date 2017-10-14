const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: String,
  countryCode: String,
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
