angular.module("CRMApp").service("customerService", function ($http) {

  this.test = 'service works!';
  this.customers = [];
  var _selectedCustomer = {};

  this.index = function (allCustomers) {
    this.customers = allCustomers;
  }

  this.setSelectedCustomer = function (customer) {
    _selectedCustomer = customer;
  }

  this.getSelectedCustomer = function () {
    return _selectedCustomer;
  }

});

