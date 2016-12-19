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
    $scope.customerEmail = 'rhythmic88@gmail.com';
    $scope.customerPhone = '';
    $scope.customerInfo = '';
    $scope.fcEmailResults = '';
    $scope.fcPhoneResults = '';
    $scope.filtering = '';
    $scope.displayedCustomers = [];
    $scope.customerId = '';
    $scope.selectedCustomer = customerService.getSelectedCustomer();
    $scope.selectedUser = {};
    $scope.users = userService.users;
    $scope.isSearching = false;
    $scope.selectedUserName = 'Select A User';

    $scope.customerNotes = noteService.getCustomerNotes();
    $scope.loggedInUser = userService.loggedInUser;

    // set the selected customer to view
    $scope.setSelectedCustomer = function (customer) {
        customerService.setSelectedCustomer(customer);
        $http.get('http://localhost:3000/notes?customerId=' + customer.Id)
            .then(function (response) {
                noteService.setSelectedCustomerNotes(response.data.notes);
                $state.go('customer');
            })
    }

    //create customer modal functions
    $scope.createNewCustomerModal = function () {
        $("#createNewCustomerModal").modal();
    }

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
                    customerService.setSelectedCustomer(response.data.customer);
                    $state.go('customer')

                    $scope.selectedCustomer = customerService.getSelectedCustomer();
                }
            })
    }

    // edit user modal functions
    $scope.editUserModal = function () {
        $("#editUserModal").modal();
    }

    $scope.editUser = function () {
        $http.put('http://localhost:3000/users/' + userService.loggedInUser.Id, {
            'Id': userService.loggedInUser.Id,
            'FirstName': $scope.editUserFName,
            'LastName': $scope.editUserLName,
            'Email': $scope.editUserEmail,
            'Password': userService.loggedInUser.Password
        })
            .then(function (response) {
                
               if (response.data.edited == true) {
                    userService.setLoggedInUser(response.data.user);
                    alert('Your account has been successfully updated!')

                }
                else {
                    alert('ERROR Please check to make sure the information you entered is valid and try again')
                }
            })
    }

    // delete user modal functions
    $scope.deleteUserModal = function () {
        $http.get(`http://localhost:3000/customers?userId=${$scope.loggedInUser.Id}`)
            .then(function(response){

                $scope.loggedInUserCustomers = response.data.customers;
                if ($scope.loggedInUserCustomers.length == 0) {
                    $scope.canDelete = true
                }
                else {
                    $scope.canDelete = false
                    $("#deleteUserModal").modal();
                }
            })
    }
    $scope.deleteAccount = function () {
        $http.delete('http://localhost:3000/users/' + userService.loggedInUser.Id)
            .then(function (response) {
                if (response.data.deleted == true) {
                    alert('Your Account has been successfully deleted!');
                    $("#deleteUserModal").close();
                    $state.go('login')
                }
                else {
                    alert('ERROR, please try again (make sure all of your customers have been reassigned)')
                }
            })
    };
    $scope.reassignCustomer = function (customer) {
        customerService.setSelectedCustomer(customer);
        $scope.selectedCustomer = customerService.getSelectedCustomer();
        $scope.getNotes();
        $('#deleteUserModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $state.go('customer')
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
    $scope.findCustomer = function () {
        $http.get(`http://localhost:3000/customers?information=${$scope.customerInfo}`)
            .then(function (response) {
                $scope.isSearching = true;
                $scope.displayedCustomers = response.data.customers;
            })
    }

    $scope.contact = function () {
        $state.go('contact')
    }

    /* FULL CONTACT
    **************************************/

    $scope.getFCByEmail = function () {
        $scope.fcEmailResults = 'loading';
        $http.get(`http://localhost:3000/customers/byEmail?email=${$scope.customerEmail}`)
            .then(function (response) {
            
            ata.object;
            })
    }

    $scope.searchCustomerPhone = function () {
        $scope.fcPhoneResults = 'loading';
        $http.get(`http://localhost:3000/customers/byPhone?phone=${$scope.customerPhone}`)
            .then(function (response) {
                $scope.fcPhoneResults = response.data.object;
            })
    }

    $scope.fcEmailResults = { "status": 200, "requestId": "479f8373-d50b-486a-acbd-cd538421946e", "likelihood": 0.88, "photos": [{ "type": "facebook", "typeId": "facebook", "typeName": "Facebook", "url": "https://d2ojpxxtu63wzl.cloudfront.net/static/6d3570d1dd1347b56f491794e0924427_aa9d0e448fa5984ac52dee8d501edf61b271e2661de16b0f65e7b8441dea7847", "isPrimary": true }, { "type": "linkedin", "typeId": "linkedin", "typeName": "LinkedIn", "url": "https://d2ojpxxtu63wzl.cloudfront.net/static/d87d9548cca163016e66d9bd2021e009_603c580ad7e4028483f349edf054e54d389590d48330453a41f4011f498bf83d" }, { "type": "gravatar", "typeId": "gravatar", "typeName": "Gravatar", "url": "https://d2ojpxxtu63wzl.cloudfront.net/static/a3fbc2a91e003309dd5618b6ed7fea98_c594e9af3addf59ba41a907ba5784ba8ee23fb37089f1e1dbbba039d3cff05ff" }, { "type": "angellist", "typeId": "angellist", "typeName": "Facebook", "url": "https://d2ojpxxtu63wzl.cloudfront.net/static/dd7714430e06e43780b6b573c9805795_b1af65e8490498640027007c414caf88b4668d270fad927d9c74a798948c7bca" }], "contactInfo": { "websites": [{ "url": "http://teamtreehouse.com/kylepinzon" }], "familyName": "Pinzon", "fullName": "Kyle Pinzon", "givenName": "Kyle" }, "organizations": [{ "name": "Digsy", "startDate": "2012-12-31", "title": "Customer Success Manager", "current": true }, { "name": "BrokerRoster", "startDate": "2012-06-30", "title": "Community Manager and Growth Hacker", "current": true }, { "name": "Digsy", "startDate": "2012-06", "title": "Director of Client Success", "current": true }, { "name": "Integrated Resources Institute", "startDate": "2012-06", "endDate": "2013-08", "title": "Job Coach" }, { "name": "JP Morgan Chase Bank", "startDate": "2007-12", "endDate": "2012" }], "demographics": { "locationDeduced": { "normalizedLocation": "La Habra, California", "deducedLocation": "La Habra, California, United States", "city": { "name": "La Habra" }, "state": { "name": "California", "code": "CA" }, "country": { "deduced": true, "name": "United States", "code": "US" }, "continent": { "deduced": true, "name": "North America" }, "county": { "deduced": true, "name": "Orange" }, "likelihood": 1 }, "gender": "Male", "locationGeneral": "La Habra, California" }, "socialProfiles": [{ "followers": 9, "type": "angellist", "typeId": "angellist", "typeName": "AngelList", "url": "https://angel.co/kyle-pinzon", "username": "kyle-pinzon", "id": "803582" }, { "type": "facebook", "typeId": "facebook", "typeName": "Facebook", "url": "https://www.facebook.com/kyle.pinzon" }, { "type": "flickr", "typeId": "flickr", "typeName": "Flickr", "url": "https://www.flickr.com/people/69246681@N07", "username": "kylepinzon", "id": "69246681@N07" }, { "type": "foursquare", "typeId": "foursquare", "typeName": "Foursquare", "url": "https://foursquare.com/user/3073730", "id": "3073730" }, { "type": "github", "typeId": "github", "typeName": "Github", "url": "https://github.com/kpinzon", "username": "kpinzon" }, { "type": "google", "typeId": "google", "typeName": "GooglePlus", "url": "https://plus.google.com/107747333110667626493", "id": "107747333110667626493" }, { "type": "gravatar", "typeId": "gravatar", "typeName": "Gravatar", "url": "https://gravatar.com/kylepinzon", "username": "kylepinzon", "id": "49801145" }, { "followers": 212, "following": 212, "type": "linkedin", "typeId": "linkedin", "typeName": "LinkedIn", "url": "https://www.linkedin.com/in/kylepinzon", "username": "kylepinzon" }] };

});

