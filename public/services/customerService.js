angular.module("CRMApp").service("customerService", function ($http) {

  this.test = 'service works!';
  this.customers = [];
  this.seletedCustomer = {};

  this.index = function (allCustomers) {
    this.customers = allCustomers;
  }
  this.setSelectedCustomer = function (customer) {
    this.seletedCustomer = customer;
  }

});

