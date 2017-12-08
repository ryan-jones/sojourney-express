const router = require('express').Router();
const m = require('../middlewares');
const ctrl = require('../controllers');

router.get('/', ctrl.users.getUserList);
router.get('/:id', m.validations.checkValidUserParams, ctrl.users.getUser);
router.put('/:id', m.validations.checkValidUserParams, ctrl.users.editUser);
router.post('/', m.validations.checkValidCreatedUser, ctrl.users.createUser);
router.delete('/:id', ctrl.users.deleteUser);

module.exports = router;
