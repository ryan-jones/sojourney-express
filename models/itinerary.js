var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  name: String,
  nationality1: String,
  nationality2: String,
  placesAndDates: {
    type: Array,
    default: []
  },
  flightPaths: {
    type: Array,
    default: []
  },
  userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],

});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
