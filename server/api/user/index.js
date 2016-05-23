let router = require('express').Router();
let log = require('./../../components/logger');
let userController = require('./user.controller');
let auth = require('./../../auth/auth.service');

// routes for api/users
router.get('/',  userController.index);

// api/users/update/:id  POST
router.post('/update/:id', userController.update);

router.post('/password/:id', userController.password);

router.post('/status/:id', userController.setStatus);

// /api/users/   POST
router.post('/', userController.create);

// /api/users/:id GET
router.get('/:id', userController.findById);



module.exports = router;
