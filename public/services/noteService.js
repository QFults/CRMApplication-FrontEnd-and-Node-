angular.module("CRMApp").service("noteService", function ($http) {

  this.test = 'service works!';
  this.notes = [];

  this.index = function (allNotes) {
    this.notes = allNotes;
  }

});

