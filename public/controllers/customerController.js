angular
.module("CRMApp")
.controller("customerController", function($scope, $http) {
    $scope.customerTestText = '';

    $scope.getAllCustomers = function() {
        $scope.customerTestText = '';
        $http.get('http://localhost:3000/customers')
        .then(function (response) {
            $scope.customerTestText = response.data.customers;
        })
    }

    
});