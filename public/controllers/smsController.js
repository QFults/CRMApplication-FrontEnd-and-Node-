angular
.module('CRMApp')
.controller('smsController', function($scope, $http, $state) {
        if(document.cookie == "") {
        $state.go('login')
    }
    $scope.smsTestText = '';
    $scope.smsTestFunction = function() {
        $scope.smsTestText = '';
        $http.get('http://localhost:3000/sms')
        .then(function(response) {
            $scope.smsTestText = response.data.message
        })
    }
})