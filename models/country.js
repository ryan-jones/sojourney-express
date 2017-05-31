var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: String,
  countryCode: String,
  visaFree: {
    type: Array,
    default: []
  },
  visaOnArrival: {
    type: Array,
    default: []
  },
  bannedFrom: {
    type: Array,
    default: []
  }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
