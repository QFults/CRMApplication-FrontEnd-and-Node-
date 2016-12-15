angular.module("CRMApp").service("customerService", function ($http) {

  this.test = 'service works!';
  this.customers = [];
  var _selectedCustomer = {};

  this.index = function (allCustomers) {
    this.customers = allCustomers;
  }

  function setSelectedCustomer (customer) {
    _selectedCustomer = customer;
  }

  function getSelectedCustomer () {
    return _selectedCustomer;
  }

});

