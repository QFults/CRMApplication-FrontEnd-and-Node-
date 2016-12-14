angular.module("CRMApp").controller("customerController", function ($scope, $http, customerService, userService, noteService, $state) {


    $scope.newFName = '';
    $scope.newLName = '';
    $scope.newFName = '';
    $scope.newEmail = '';
    $scope.newFName = '';
    $scope.newPNumber = '';
    $scope.newDOB = '';
    $scope.isLead = false;
    $scope.isClient = false;
    $scope.newGender = '';
    $scope.newAddr = '';
    $scope.newCity = '';
    $scope.newState = '';
    $scope.newZip = '';
    $scope.customerEmail = '';
    $scope.customerPhone = '';
    $scope.customerInfo = '';
    $scope.emailCheckResult = '';
    $scope.phoneCheckResult = '';
    $scope.filtering = '';
    $scope.displayedCustomers = [];
    $scope.selectedUser = {};
    $scope.users = userService.users;
    $scope.customerId = '';
    $scope.isSearching = false;
    $scope.selectedUserName = 'Select A User';
    
    // Notes
    $scope.notes;

    $scope.createNewCustomer = function () {
        $http.post(`http://localhost:3000/customers`,
            {
                'UserId': 1,
                'FirstName': $scope.newFName,
                'LastName': $scope.newLName,
                'Email': $scope.newEmail,
                'Phone': $scope.newPNumber,
                'DOB': $scope.newDOB,
                'LeadState': $scope.isLead,
                'Gender': $scope.newGender,
                'City': $scope.newCity,
                'State': $scope.newState,
                'Zip': $scope.newZip,
                'StreetAddress': $scope.newAddr
            })
            .then(function (response) {
                if (response.data.post == false) {
                    alert('You must enter either Email or Password to create a new Customer')
                }
                else {
                    alert('Customer Created!');
                    customerService.setSelectedCustomer(response.data);
                    $state.go('customer')
                }
            })
    }

    $scope.setSelectedUser = function (userObj) {
        $scope.selectedUser = userObj;
        userService.setSelectedUser(userObj);
        $scope.selectedUserName = userObj.FirstName + userObj.LastName
    }
    $scope.findUserCustomers = function () {
        $http.get(`http://localhost:3000/customers?userId=${$scope.selectedUser.Id}`)
            .then(function (response) {
                $scope.isSearching = true;
                $scope.displayedCustomers = response.data.customers

            })
    }
    $scope.createNewCustomerModal = function () {
        $("#createNewCustomerModal").modal();
    }
    $scope.findCustomer = function () {
        $http.get(`http://localhost:3000/customers?information=${$scope.customerInfo}`)
            .then(function (response) {
                $scope.isSearching = true;
                $scope.displayedCustomers = response.data.customers;
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

    $scope.contact = function() {
        $state.go('contact')
    }
    /* NOTES
    **************************************/

    $scope.getNotes = function () {
        $scope.notes = 'loading'
        $http.get('http://localhost:3000/notes?customerId=' + $scope.customerId)
            .then(function (response) {
                $scope.notes = response.data.notes;
                noteService.getNotes(response.data.notes);
            })
    }

});

