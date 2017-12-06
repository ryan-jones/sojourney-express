const router = require('express').Router();
const m = require('_/middlewares');
const ctrl = require('./controllers');
// let tokenCheck = [m.jwt.exist, m.jwt.verify];


router.post('/login', m.validations.checkValidLoginCreds, ctrl.admin.loginUser);
router.post('/signup', m.validations.checkValidSignupCreds, ctrl.admin.signupUser);

module.exports = router;
