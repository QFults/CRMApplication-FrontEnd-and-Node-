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

router.get('/', function (req, res) {
  res.render('index')
});

// user routes
router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy);

// customer routes
router.get('/customers', customerController.index);
router.get('/customers/byEmail', customerController.searchFCByEmail);
router.get('/customers/byPhone', customerController.searchFCByPhone);
router.post('/customers', customerController.create);
router.put('/customers/:id', customerController.update);

// note routes
router.get('/notes', noteController.index);
router.post('/notes', noteController.create);
router.delete('/notes/:id', noteController.destroy);

// sms routes
router.get('/sms', smsController.test);

// email routes
router.get('/email', emailController.test);


module.exports = router;