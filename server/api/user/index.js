let router = require('express').Router();
let log = require('./../../components/logger');
let userController = require('./user.controller');
let auth = require('./../../auth/auth.service');

router.get('/', userController.index);

module.exports = router;
