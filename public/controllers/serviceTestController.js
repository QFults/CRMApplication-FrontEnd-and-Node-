angular.module("CRMApp").controller("serviceTestController", function($scope, $http, customerService) {

  // To access service directly from html via {{ customerService.varName }}
  $scope.customerService = customerService;

  $scope.customers = [];
  

    $scope.index = function() {
        customerService.customers = 'loading';
        $http.get('http://localhost:3000/customers')
        .then(function (response) {
            $scope.customers = response.data.customers;
            customerService.index(response.data.customers);
        })
    }

});