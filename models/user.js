var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  places_visited: {
    type: Array,
    default: []
  },
  itineraries: {
    type: Array,
    default: []
  },
  nationality: String,
  nationality2: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
