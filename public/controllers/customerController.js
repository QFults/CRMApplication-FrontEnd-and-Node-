angular
.module("CRMApp")
.controller("customerController", function($scope, $http) {
        $scope.customerEmail = '';
        $scope.customerInfo = '';
    $scope.customerTestText = '';

    $scope.customerTestFunction = function() {
        $scope.customerTestText = '';
        $http.get(`http://localhost:3000/customer`)
        .then(function(response) {
            $scope.customerTestText = response.data.message
        })
    }
    $scope.moreCustomerInfo = function() {
        $http.get(`http://localhost:3000/customer/newInfo?email=${$scope.customerEmail}`)
        .then(function(response) {
            $scope.customerInfo = response.data.object;
        })
    }
})