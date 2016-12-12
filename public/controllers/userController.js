angular
.module('CRMApp')
.controller('userController', function($scope, $http, userService) {
    $scope.userTestText = '';

    $scope.getAllUsers = function() {
        $scope.userTestText = '';

        $http.get('http://localhost:3000/users')
        .then(function(response) {
            $scope.userTestText = response.data.message;
            console.log(response.data.message);
        })
    }

    
});