angular.module("CRMApp").service("noteService", function ($http) {

  this.notes = '';

  /* GETS
  ********************/

  this.index = function (allNotes) {
    this.notes = allNotes;
  }

  /* CREATE
  ********************/

  /* UPDATE
  ********************/

  /* DELETE
  ********************/

});

