angular
.module('CRMApp')
.controller('noteController', function($scope, $http, noteService, customerService) {
    $scope.noteTestText = '';

    $scope.noteTestFunction = function() {
        $scope.noteTestText = '';
        
        $http.get('http://localhost:3000/noteTest')
        .then(function(response) {
            $scope.noteTestText = response.data.message
        })
    }
    
});