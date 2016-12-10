angular
.module('CRMApp')
.controller('emailController', function($scope, $http) {
    $scope.emailTestText = '';
    $scope.emailTestFunction = function() {
        $scope.emailTestText = '';
        $http.get('http://localhost:3000/email')
        .then(function(response) {
            $scope.emailTestText = response.data.message
        })
    }
})