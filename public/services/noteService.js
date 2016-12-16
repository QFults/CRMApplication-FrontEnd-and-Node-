angular.module("CRMApp").service("noteService", function ($http) {

  var _customerNotes = [];

// asfhthj;o'pkojoyurrsegvjnk
  this.setSelectedCustomerNotes = function(notes) {
    _customerNotes = notes;
  }
  /* GETS
  ********************/

  this.getCustomerNotes = function () {
    return _customerNotes;
  }


  /* CREATE
  ********************/


  /* UPDATE
  ********************/


  /* DELETE
  ********************/

});

