angular.module("CRMApp").service("noteService", function ($http) {

  var _customerNotes = [];
  var _editedNotes = [];

  /* SETS
  ********************/

  this.setSelectedCustomerNotes = function(notes) {
    _customerNotes = notes;
  }

  this.setEditedNotes = function (notes) {
    _editedNotes = notes;
  }

  /* GETS
  ********************/

  this.getCustomerNotes = function () {
    return _customerNotes;
  }

  this.getEditedNotes = function () {
    return _editedNotes;
  }

  /* CREATE
  ********************/


  /* UPDATE
  ********************/


  /* DELETE
  ********************/

});

