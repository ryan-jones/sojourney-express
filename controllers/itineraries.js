const User = require('../models/user');
const Itinerary = require('../models/itinerary');

exports.createItinerary = createItinerary;

function createItinerary(req, res) {
  const { id, name, flightPaths, placesAndDates, nationalities } = req.body;
  const newItinerary = Itinerary({
    id,
    name,
    nationalities,
    placesAndDates
  });

  newItinerary.save((err, itinerary) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      User.findByIdAndUpdate(
        {
          _id: userId
        },
        {
          $push: {
            itineraries: itinerary.id
          }
        },
        (err, user) => {
          if (err) {
            res.json(err);
          } else {
            res.json(user);
          }
        }
      );
    }
  });
}
