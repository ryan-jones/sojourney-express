const Country = require('../models/country');

exports.getCountries = getCountries;
exports.createCountryList = createCountryList;

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
    console.log('err&&&&', err)
    if (err) {
      res.json(err);
    } else {
      res.json(theCountry);
    }
  });
}
