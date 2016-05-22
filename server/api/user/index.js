let router = require('express').Router();
let log = require('./../../components/logger');
let userController = require('./user.controller');
let auth = require('./../../auth/auth.service');

// routes for api/users
router.get('/', auth.isAuthenticated(), userController.index);

router.post('/update/:id', userController.update);

// /api/users/   POST
router.post('/', userController.create);

// /api/users/:id GET
router.get('/:id', userController.findById);



module.exports = router;
