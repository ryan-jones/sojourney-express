const router = require('express').Router();
const m = require('../middlewares');
const ctrl = require('../controllers');


router.post('/', m.validations.checkValidItinerary, ctrl.itineraries.createItinerary);

module.exports = router;
