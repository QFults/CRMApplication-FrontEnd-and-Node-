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
router.get('/userTest', userController.test);
router.get('/customerTest', customerController.test);
router.get('/noteTest', noteController.test);
router.get('/smsTest', smsController.test);
router.get('/emailTest', emailController.test);


module.exports = router;