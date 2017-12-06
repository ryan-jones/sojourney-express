const Country = require('../models/country');

exports.getCountries = getCountries;

function getCountries(req, res) {
  Country.find((err, countryList) => {
    if (err) next(err);
    return res.json(countryList);
  });
}

function createCountryList(req, res) {
  const { name, countryCode, visaFree, visaOnArrival, bannedFrom } = req.body;
  const theCountry = new Country({
    name,
    countryCode,
    visaFree,
    visaOnArrival,
    bannedFrom
  });

  theCountry.save(err => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        id: theCountry._id
      });
    }
  });
}
