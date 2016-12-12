angular.module("CRMApp").controller("serviceTestController", function($scope, $http, customerService, noteService) {

    $scope.noteService = noteService;

    $scope.customers = [];
  

    $scope.index = function() {
        noteService.notes = 'loading';
        $http.get('http://localhost:3000/notes')
        .then(function (response) {
            $scope.notes = response.data.notes;
            noteService.index(response.data.notes);
        })
    }

});