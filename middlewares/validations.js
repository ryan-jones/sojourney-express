const mongoose = require('mongoose');

exports.checkValidLoginCreds = checkValidLoginCreds;
exports.checkValidSignupCreds = checkValidSignupCreds;
exports.checkValidCountryList = checkValidCountryList;
exports.checkValidItinerary = checkValidItinerary;
exports.checkValidUserParams = checkValidUserParams;
exports.checkValidUserBody = checkValidUserBody;
exports.checkValidCreatedUser = checkValidCreatedUser;

function checkValidLoginCreds(req) {
  if (!req.body.username && !req.body.password) {
    return res.status(401).json({ message: 'fill up the fields' });
  } else {
    next();
  }
}

function checkValidSignupCreds(req) {
  if (!req.body.username || !req.body.password || !req.body.nationalities) {
    return res
      .status(400)
      .json({ message: 'Provide username, password, and nationality' });
  } else {
    next();
  }
}

function checkValidCountryList(req) {
  const { name, countryCode, visaFree, visaOnArrival, bannedFrom } = req.body;
  if (!name || !countryCode || !visaFree || !visaOnArrival) {
    return res
      .status(401)
      .json({ message: 'Provide name, countryCode, and visa fields' });
  } else {
    next();
  }
}

function checkValidItinerary(req) {
  const { id, name, flightPaths, placesAndDates, nationalities } = req.body;
  if (!id || !name || !placesAndDates || !nationalities) {
    return res
      .status(401)
      .json({ message: 'Provide id, name, placesAndDates, and nationalities' });
  } else {
    next();
  }
}

function checkValidUserParams(req) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
  } else {
    next();
  }
}

function checkValidUserBody(req) {
  if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
  } else {
    next();
  }
}

function checkValidCreatedUser(req) {
  const {
    name,
    username,
    password,
    placesVisited,
    itineraries,
    nationalities
  } = req.body;
  if (
    !name ||
    !username ||
    !password ||
    !placesVisited ||
    !itineraries ||
    !nationalities
  ) {
    res.status(400).json({ message: 'User is not complete' });
  } else {
    next();
  }
}
