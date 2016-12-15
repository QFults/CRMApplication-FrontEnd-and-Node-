angular.module("CRMApp").service("userService", function ($http) {

  this.test = 'service works!';
  this.users = [];
  this.seletedUser = {};
  this.loggedInUser = {};

  this.index = function (allUsers) {
    this.users = allUsers;
  }

  this.setSelectedUser = function (user) {
    this.selectedUser = user;
  }
  this.setLoggedInUser = function (user){
    this.loggedInUser = user;
  }
});