angular
.module("CRMApp")
.controller("customerController", function($scope, $http) {
    $scope.customerTestText = '';
    $scope.customerTestFunction = function() {
        $scope.customerTestText = '';
        $http.get('http://localhost:3000/customerTest')
        .then(function(response) {
            $scope.customerTestText = response.data.message
        })
    }
})