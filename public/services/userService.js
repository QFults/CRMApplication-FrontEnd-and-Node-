angular.module("CRMApp").service("customerService", function ($http) {

  this.test = 'service works!';
  this.users = [];

  this.index = function (allUsers) {
    this.users = allUsers;
  }

});

