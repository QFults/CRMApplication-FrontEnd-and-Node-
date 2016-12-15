var app = angular.module('CRMApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

  // $urlRouterProvider.otherwise('/login'); // default page

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: './views/home.html',
    controller: 'customerController'
  })
  .state('customer', {
    url: '/customer',
    templateUrl: './views/customer.html',
    controller: 'customerController'
  })
  .state('login', {
    url: '/login',
    templateUrl: './views/login.html',
    controller: 'userController'
  })
    .state('recovery', {
    url: '/recovery',
    templateUrl: './views/recovery.html',
    controller: 'userController'
  })
    .state('contact', {
    url: '/contact',
    templateUrl: './views/contact.html',
    controller: 'smsController'
  })
  .state('serviceTest', {
    url: '/serviceTest',
    templateUrl: './views/serviceTest.html',
    controller: 'customerController'
  })
    .state('userPage', {
    url: '/userPage',
    templateUrl: './views/userPage.html',
    controller: 'userController'
  })
});
