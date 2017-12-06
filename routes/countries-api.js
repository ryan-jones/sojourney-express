const router = require('express').Router();
const m = require('_/middlewares');
const ctrl = require('./controllers');

router.get('/', ctrl.countries.getCountries);
router.post('/', m.validations.checkValidCountryList, ctrl.countries.createCountryList);

module.exports = router;
