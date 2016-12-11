angular.module("CRMApp").service("customerService", function ($http) {

  this.test = 'service works!';
  this.customers = [];

  this.index = function (allCustomers) {
    this.customers = allCustomers;
  }

});

