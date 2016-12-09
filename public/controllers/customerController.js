angular
.module("CRMApp")
.controller("customerController", function($scope, $http) {
    $scope.customerEmail = '';
    $scope.customerPhone = '';
    $scope.customerInfo = '';
    $scope.customerTestText = '';
    $scope.emailCheckResult = '';
    $scope.phoneCheckResult = '';

    $scope.getAllCustomers = function() {
        $scope.customerTestText = '';
        $http.get('http://localhost:3000/customers')
        .then(function (response) {
            $scope.customerTestText = response.data.customers;
        })
    }

    $scope.searchCustomerEmail = function() {
        $scope.emailCheckResult = 'loading';
        $http.get(`http://localhost:3000/customers/byEmail?email=${$scope.customerEmail}`)
        .then(function(response) {
            $scope.emailCheckResult = response.data.object;
        })
    }
    
    $scope.searchCustomerPhone = function() {
        $scope.phoneCheckResult = 'loading';
        $http.get(`http://localhost:3000/customers/byPhone?phone=${$scope.customerPhone}`)
        .then(function(response) {
            $scope.phoneCheckResult = response.data.object;
        })
    }
});


