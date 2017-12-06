'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  name: { type: String, required: true },
  nationalities: {
    type: [String],
    default: []
  },
  placesAndDates: {
    type: Array,
    default: []
  },
  flightPaths: {
    type: Array,
    default: []
  },
  userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
