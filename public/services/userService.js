angular.module("CRMApp").service("userService", function ($http) {

  this.test = 'service works!';
  this.users = [];

  this.index = function (allUsers) {
    this.users = allUsers;
  }

});

