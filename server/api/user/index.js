let router = require('express').Router();
let log = require('./../../components/logger');
let userController = require('./user.controller');
let auth = require('./../../auth/auth.service');

router.get('/', auth.isAuthenticated(), userController.index);

// /api/users/ :post
router.post('/', userController.create); 


module.exports = router;
