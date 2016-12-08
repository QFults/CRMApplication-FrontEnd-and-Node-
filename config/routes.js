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
router.get('/user', userController.test);
router.get('/customer', customerController.test);
router.get('/note', noteController.test);
router.get('/sms', smsController.test);
router.get('/email', emailController.test);
router.get('/customer/newInfo', customerController.getCustomerInfo);

module.exports = router;