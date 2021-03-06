const router = require('express').Router();
const m = require('_/middlewares');
const ctrl = require('./controllers');


router.get('/', ctr.users.getUserList);
router.get('/:id', m.validations.checkValidUserParams, ctrl.users.getUser);
router.put('/', m.validations.checkValidUserBody, ctrl.users.editUser);
router.post('/', m.validations.checkValidCreatedUser, ctrl.users.createUser);
router.delete('/:id', ctrl.users.deleteUser);

module.exports = router;
