angular.module('CRMApp').controller('userController', function ($scope, $http, $state, $stateParams, userService) {
    $scope.userID = null;
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

    $scope.index = function () {
        $http.get('http://localhost:3000/users')
            .then(function (response) {
                console.log(response.data.users);
                userService.index(response.data.users);
            })
    }

    $scope.login = function () {
        $http.get(`http://localhost:3000/users?email=${$scope.email}&password=${$scope.password}`)
            .then(function (response) {
                if(response.data.userExists == true){
                userService.setLoggedInUser(response.data);
                $scope.loginTest = response.data;
                $scope.loginTestView = true;
                }
                else{
                    alert('Invalid Email or Password')
                }
            })
    };

    $scope.newUser = function () {
        $http.post('http://localhost:3000/users', { firstName: $scope.firstName, lastName: $scope.lastName, email: $scope.newEmail, password: $scope.password })
            .then(function (response) {
                console.log(response.data.message);
                $scope.signUpTest = response.data.message;
                $scope.signUpTestView = true;
            })
    };

    $scope.continue = function () {
        $state.go('home')
    }
});
