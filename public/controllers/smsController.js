angular
.module("CRMApp")
.controller("smsController", function($scope, $http) {
    $scope.smsTestText = '';
    $scope.smsTestFunction = function() {
        $scope.smsTestText = '';
        $http.get('http://localhost:3000/smsTest')
        .then(function(response) {
            $scope.smsTestText = response.data.message
        })
    }
})