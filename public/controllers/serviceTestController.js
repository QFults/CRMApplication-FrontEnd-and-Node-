angular.module("CRMApp").controller("serviceTestController", function($scope, $http, customerService, noteService) {

    $scope.noteService = noteService;

    $scope.customers = [];

    $scope.customerId = 2;
  

    $scope.index = function() {
        noteService.notes = 'loading';
        $http.get('http://localhost:3000/notes?customerId=' + $scope.customerId)
        .then(function (response) {
            $scope.notes = response.data.notes;
            noteService.index(response.data.notes);
        })
    }

});