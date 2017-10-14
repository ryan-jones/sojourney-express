'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  placesVisited: {
    type: [String],
    default: []
  },
  itineraries: [{ type: Schema.Types.ObjectId, ref: 'Itinerary' }],
  nationalities: {
    type: [String],
    default: []
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
