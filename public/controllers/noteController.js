angular.module('CRMApp').controller('noteController', function($scope, $http, noteService, customerService) {
    if(document.cookie == "") {
        $state.go('login')
    }
    $scope.noteService = noteService;
    $scope.notes = '';

    $scope.index = function() {
        $scope.notes = 'loading';
        
        $http.get('http://localhost:3000/notes')
        .then(function (response) {
            $scope.notes = response.data.message;
            noteService.index(response.data.message);
        })
    }




    
});