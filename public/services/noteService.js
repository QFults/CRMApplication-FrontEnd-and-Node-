angular.module("CRMApp").service("noteService", function ($http) {

// note service  variables
  var _customerNotes = [];

// sets the notes for the selected Customer
  this.setSelectedCustomerNotes = function(notes) {
    _customerNotes = notes;
  }

  /* GETS
  ********************/
// returns the notes
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

