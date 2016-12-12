angular
    .module('CRMApp')
    .controller('userController', function ($scope, $http, $state, $stateParams, userService) {
        $scope.userID = 1;
        $scope.email - '';
        $scope.password = '';
        $scope.newFirstName = '';
        $scope.newLastName = '';
        $scope.newEmail = '';
        $scope.confirmEmail = '';
        $scope.newPassword = '';
        $scope.confirmPassword = '';
        $scope.loginTest = '';
        $scope.signUpTest = '';
        $scope.signUpTestView = false;
        $scope.loginTestView = false;

        // $scope.getAllUsers = function() {
        //     $scope.userTestText = '';

        //     $http.get('http://localhost:3000/users')
        //     .then(function(response) {
        //         $scope.userTestText = response.data.message;
        //         console.log(response.data.message);
        //     })
        // }
        $scope.login = function () {
            $http.get(`http://localhost:3000/users/${$scope.userID}?email=${$scope.email}&password=${$scope.password}`)
                .then(function (response) {
                    console.log(response.data.message);
                    $scope.loginTest = response.data.message;
                    $scope.loginTestView = true;
                })
        }
        $scope.newUser = function () {
            $http.post('http://localhost:3000/users', { firstName: $scope.firstName, lastName: $scope.lastName, email: $scope.newEmail, password: $scope.password })
                .then(function (response) {
                    console.log(response.data.message);
                    $scope.signUpTest = response.data.message;
                    $scope.signUpTestView = true;
                })
        }
        $scope.continue = function () {
            $state.go('home')
        }
    });