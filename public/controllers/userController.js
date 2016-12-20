angular.module('CRMApp').controller('userController', function ($scope, $http, $state, $stateParams, userService) {
    if (document.cookie == "") {
        $state.go('login')
    }
    $scope.userID = null;
    $scope.email - '';
    $scope.password = '';
    $scope.newFirstName = '';
    $scope.newLastName = '';
    $scope.newEmail = '';
    $scope.confirmEmail = '';
    $scope.newPassword = '';
    $scope.confirmPassword = '';
    $scope.test = function () {
        alert(document.cookie)
    }
    $scope.loggedIn = function () {
        console.log('hello')
    }
    $scope.index = function () {
        if (document.cookie !== "") {
            $http.get('http://localhost:3000/getCookie')
                .then(function (response) {
                    var Id = response.data.user;
                    $http.get('http://localhost:3000/users/' + Id)
                        .then(function (response) {
                            userService.setLoggedInUser(response.data.user)
                            $state.go('home')
                        })
                })
        }
        else {
            $state.go('login')
        };
        $http.get('http://localhost:3000/users')
            .then(function (response) {
                userService.setAllUsers(response.data.users);
            })
    }

    $scope.login = function () {
        $http.get(`http://localhost:3000/users?email=${$scope.email}&password=${$scope.password}`)
            .then(function (response) {
                if (response.data.userExists == true) {
                    userService.setLoggedInUser(response.data.user);
                    $http.get('http://localhost:3000/createCookie?Id=' + response.data.user.Id)
                        .then(function (response) {
                            $state.go('home');
                        })
                }
                else {
                    alert('Invalid Email or Password')
                }
            })
    };

    $scope.newUser = function () {
        $http.post('http://localhost:3000/users', { firstName: $scope.firstName, lastName: $scope.lastName, email: $scope.newEmail, password: $scope.password })
            .then(function (response) {
                if (response.data.userCreated == true) {
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

    $scope.recoverAccountModal = function () {
        $('#recoverAccountModal').modal();
    }
    $scope.recover = function () {

    }
});
