angular.module("CRMApp").service("userService", function ($http) {

  this.test = 'service works!';
  this.users = [];
  this.selectedUser = {};
  this.loggedInUser = {};

  this.index = function (allUsers) {
    this.users = allUsers;
  }

  this.setAllUsers = function (users) {
    this.users = users;
  }

  this.getAllUsers = function () {
    return this.users;
  }

  this.setSelectedUser = function (user) {
    this.selectedUser = user;
  }

  this.getSelectedUser = function () {
    return this.selectedUser;
  }
  
  this.setLoggedInUser = function (user){
    this.loggedInUser = user;
  }
    this.getLoggedInUser = function () {
    return this.loggedInUser;
  }
  
});