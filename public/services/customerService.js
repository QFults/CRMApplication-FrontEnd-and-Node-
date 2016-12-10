angular.module("CRMApp").services("customerService", function($http) {

  this.customers = [];

  this.index = function() {
    $http.get('http://localhost:3000/customers')
      .then(function (response) {
        console.log('get all customers from customerService' + response.data.customers);
        this.customers = response.data.customers;
      })
  }

});