angular
.module('CRMApp')
.controller('userController', function($scope, $http) {
    $scope.userTestText = '';
    $scope.username = '';
    $scope.password = '';
    $scope.newFirstName = '';
    $scope.newLastName = '';
    $scope.newEmail = '';
    $scope.confirmEmail = '';
    $scope.newUsername = '';
    $scope.newPassword = '';
    $scope.confirmPassword = '';
    $scope.companyID = null;


    $scope.getAllUsers = function() {
        $scope.userTestText = '';

        $http.get('http://localhost:3000/users')
        .then(function(response) {
            $scope.userTestText = response.data.message;
            console.log(response.data.message);
        })
    }
    $scope.login = function() {
        $http.get('http://localhost:3000/users/')
        .then(function(response) {
            $scope.userTestText = response.data.message;
            console.log(response.data.message);
        })
    }
    
});