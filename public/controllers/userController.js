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
    $scope.test = function() {
        alert(document.cookie)
    }
    $scope.loggedIn = function () {
        console.log('hello')
    }
    $scope.index = function () {
        $http.get('http://localhost:3000/users')
            .then(function (response) {
                userService.index(response.data.users);
            })
    }

    $scope.login = function () {
        $http.get(`http://localhost:3000/users?email=${$scope.email}&password=${$scope.password}`)
            .then(function (response) {
                if(response.data.userExists == true){
                userService.setLoggedInUser(response.data.user);
        $http.get(`http://localhost:3000/userCookie?email=${$scope.email}&password=${$scope.password}`) 
            .then(function (response) {
                $state.go('home');
            })
                }
                else{
                    alert('Invalid Email or Password')
                }
            })
    };

    $scope.newUser = function () {
        $http.post('http://localhost:3000/users', { firstName: $scope.firstName, lastName: $scope.lastName, email: $scope.newEmail, password: $scope.password })
            .then(function (response) {
                if(response.data.userCreated == true) {
                    userService.setLoggedInUser(response.data.user);
                    $state.go('home');
                }
                else {
                    alert('One or more entries are invalid. Please check your information and try again.')
                }
            })
    };

    $scope.continue = function () {
        $state.go('home')
    }

    $scope.recoverAccountModal = function() {
        $('#recoverAccountModal').modal();
    }
    $scope.recover = function() {
        
    }
});
