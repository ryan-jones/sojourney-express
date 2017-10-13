var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: string,
  username: string,
  password: string,
  places_visited: {
    type: Array,
    default: []
  },
  itineraries: [{ type: Schema.Types.ObjectId, ref: 'Itinerary' }],
  nationalities: string[]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
