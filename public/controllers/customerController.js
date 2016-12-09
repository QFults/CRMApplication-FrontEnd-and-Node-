angular
.module("CRMApp")
.controller("customerController", function($scope, $http) {
    $scope.customerEmail = '';
    $scope.customerInfo = '';
    $scope.customerTestText = '';

    $scope.getAllCustomers = function() {
        $scope.customerTestText = '';
        $http.get('http://localhost:3000/customers')
        .then(function (response) {
            $scope.customerTestText = response.data.customers;
        })
    }

    $scope.moreCustomerInfo = function() {
        $scope.customerInfo = '';
        $http.get(`http://localhost:3000/customer/newInfo?email=${$scope.customerEmail}`)
        .then(function(response) {
            console.log('full contact test');
            $scope.customerInfo = response.data.object;
        })
    }
    
});


