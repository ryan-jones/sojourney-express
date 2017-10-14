var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
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
