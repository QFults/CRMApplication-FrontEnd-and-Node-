angular
    .module("CRMApp")
    .controller("customerController", function ($scope, $http, customerService, userService) {

        $scope.customerEmail = '';
        $scope.customerPhone = '';
        $scope.customerInfo = '';
        $scope.emailCheckResult = '';
        $scope.phoneCheckResult = '';
        $scope.filtering = '';
        $scope.displayedCustomers = [];
        $scope.selectedUser = {};
        $scope.users = userService.users;

        $scope.setSelectedUser = function(userObj) {
            $scope.selectedUser = userObj;
            userService.setSelectedUser(userObj)
        }
        $scope.findUserCustomers = function () {
            $http.get(`http://localhost:3000/customers?userId=${$scope.selectedUser.Id}`)
        }

        $scope.findCustomer = function () {
            $http.get('http://localhost:3000/customers')
                .then(function (response) {
                    $scope.customerTestText = response.data.customers;
                })
        }

        $scope.searchCustomerEmail = function () {
            $scope.emailCheckResult = 'loading';
            $http.get(`http://localhost:3000/customers/byEmail?email=${$scope.customerEmail}`)
                .then(function (response) {
                    $scope.emailCheckResult = response.data.object;
                })
        }

        $scope.searchCustomerPhone = function () {
            $scope.phoneCheckResult = 'loading';
            $http.get(`http://localhost:3000/customers/byPhone?phone=${$scope.customerPhone}`)
                .then(function (response) {
                    $scope.phoneCheckResult = response.data.object;
                })
        }
    });

