angular
.module("CRMApp")
.controller("userController", function($scope, $http) {
    $scope.userTestText = '';
    $scope.userTestFunction = function() {
        $scope.userTestText = '';
        $http.get('http://localhost:3000/user')
        .then(function(response) {
            $scope.userTestText = response.data.message
        })
    }
})