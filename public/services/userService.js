angular.module("CRMApp").service("userService", function ($http) {

  this.test = 'service works!';
  this.users = [];
  this.seletedUser = {};

  this.index = function (allUsers) {
    this.users = allUsers;
  }

  this.setSelectedUser = function (user) {
    this.selectedUser = user;
  }

});

console.log('cmon bihh');