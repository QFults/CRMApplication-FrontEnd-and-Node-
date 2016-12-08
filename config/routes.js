// put express on routes
var express = require('express');
var router = express.Router();

// which controller on node that we use
var userController = require('../controllers/userControllerNode');
var customerController = require('../controllers/customerControllerNode');
var noteController = require('../controllers/noteControllerNode');
var smsController = require('../controllers/smsControllerNode');
var emailController = require('../controllers/emailControllerNode');

// what the route looks like between your public and node controllers
// just examples, will have more routes based on different methods in controllers

// 
router.get('/user', userController);
router.get('/customer', customerController);
router.get('/note', noteController);
router.get('/sms', smsController);
router.get('/email', emailController);
router.get('/customer/newInfo', customerController.getCustomerInfo);

module.exports = router;