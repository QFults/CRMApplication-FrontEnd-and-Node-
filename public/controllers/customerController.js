angular.module("CRMApp").controller("customerController", function ($scope, $http, customerService, userService, noteService, $state) {

    if (document.cookie == "") {
        $state.go('login')
    }
        $http.get('http://localhost:3000/users')
        .then(function (response) {
            userService.index(response.data.users);
            $scope.users = userService.getAllUsers();
        })

    // Customers
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
    $scope.customerPhone = '';
    $scope.customerInfo = '';
    $scope.filtering = '';
    $scope.isSearching = false;
    $scope.displayedCustomers = [];
    $scope.customerId = '';
    $scope.selectedCustomer = customerService.getSelectedCustomer();
    $scope.editedCustomer = {};
    // Users
    $scope.selectedUserName = 'Select An Agent';
    $scope.loggedInUser = userService.getLoggedInUser();
    $scope.users = userService.getAllUsers();
    $scope.selectedUser = userService.getSelectedUser();
    setAssignedUser();
    // Notes
    $scope.customerNotes = noteService.getCustomerNotes();
    $scope.newNoteSubject = '';
    $scope.newNoteBody = '';
    $scope.newNoteAuthor;
    $scope.newNoteDate;
    $scope.newNoteMood = '';
    // Full Contact
    $scope.fcEmailResults = '';
    $scope.fcPhoneResults = '';
    $scope.fcByEmailShown = false;
    $scope.fcByPhoneShown = false;
    $scope.loggedInUserCustomers = [];

    $scope.initUserCustomers = function () {
        $http.get('http://localhost:3000/getCookie')
            .then(function (response) {
                var Id = response.data.user;
                $http.get('http://localhost:3000/customers?userId=' + Id)
                    .then(function (response) {
                        if (response.data.customers.length == 0) {
                            console.log(response.data)
                            $scope.cantDelete = false;

                        }
                        else {
                            $scope.loggedInUserCustomers = response.data.customers;
                            console.log($scope.loggedInUserCustomers);
                            $scope.cantDelete = true;

                        }
                    })
            })
    }

    $scope.logout = function() {
                $http.get('http://localhost:3000/clearcookie')
            .then(function (response) {
                $state.go('login');
            })
    }

    $scope.check = function () {
        console.log(userService.getLoggedInUser())
    }

    function returnDate() {
        var now = new Date();
        return (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes()
    }

    /* CUSTOMERS
    ****************************************/

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

    // Edit Customer Modal
    $scope.editCustomerModal = function () {
        $scope.editedCustomer = angular.copy($scope.selectedCustomer);
        $("#editCustomerModal").modal();
    }

    $scope.saveEditedCustomer = function () {
        $http.put('http://localhost:3000/customers/' + $scope.selectedCustomer.Id, $scope.editedCustomer)
            .then(function (response) {
                // this works, but maybe run get customers by user id instead?
                $scope.selectedCustomer = $scope.editedCustomer;
            });
    }

    $scope.transferCustomer = function (user) {
        $scope.selectedCustomer.UserId = user.Id;
        $http.put('http://localhost:3000/customers/' + $scope.selectedCustomer.Id, $scope.selectedCustomer)
            .then(function (response) {
                if (response.status != 200) {
                    alert('error status ' + response.status);
                }
                else {
                    setAssignedUser();
                }
            })
    }

    $scope.deleteCustomer = function () {
        var confirmed = confirm('Are you sure you want to permanently delete this customer and all of their information?');

        if (confirmed == true) {
            $http.delete('http://localhost:3000/customers/' + $scope.selectedCustomer.Id)
                .then(function (response) {
                    if (response.status != 200) {
                        alert('error status' + response.status);
                    }
                    else {
                        $state.go('home');
                    }
                });
        }
    }

    /* USERS
    ****************************************/

    function getAllUsers() {
        $http.get('http://localhost:3000/users/')
            .then(function (response) {
                userService.setAllUsers(response.data.users);
                $scope.users = userService.getAllUsers();
            })
    }

    function setAssignedUser() {
        for (var i = 0; i < $scope.users.length; i++) {
            if ($scope.users[i].Id == $scope.selectedCustomer.UserId) {
                $scope.assignedUser = $scope.users[i];
            }
        }
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
        $("#deleteUserModal").modal();
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
        $scope.customerNotes = noteService.getCustomerNotes();
        $('#deleteUserModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $state.go('customer')
    }

    $scope.setSelectedUser = function (userObj) {
        $scope.selectedUser = userObj;
        userService.setSelectedUser(userObj);
        $scope.selectedUserName = userObj.FirstName + " " + userObj.LastName;
        $scope.findUserCustomers();
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

    /* NOTES
    **************************************/

    $scope.setNoteMood = function (mood, status) {
        if (status == 'new') {
            $scope.newNoteMood = mood;
        }
        if (status == 'edit') {
            $scope.editedNote.Mood = mood;
        }

        $scope.isHappy = false;
        $scope.isNeutral = false;
        $scope.isMad = false;
        $('.moodDivs').removeClass('botBordBlue');
        $('.moodBtn').blur();
        if (mood == 'Happy') {
            $scope.isHappy = true;
        }
        else if (mood == 'Neutral') {
            $scope.isNeutral = true;
        }
        else {
            $scope.isMad = true;
        }
    }

    $scope.saveNewNote = function () {
        if ($scope.newNoteBody == '' || $scope.newNoteSubject == '') {
            alert("Please specify a mood, subject, and body before saving.");
        }
        else {
            $('.moodDivs').removeClass('botBordBlue');
            $('.moodBtn').blur();
            var dateAdded = returnDate();
            var authorName = $scope.loggedInUser.FirstName + ' ' + $scope.loggedInUser.LastName;
            $http.post('http://localhost:3000/notes/',
                {
                    'CustomerId': $scope.selectedCustomer.Id,
                    'DateAdded': dateAdded,
                    'Author': authorName,
                    'Subject': $scope.newNoteSubject,
                    'Body': $scope.newNoteBody,
                    'Mood': $scope.newNoteMood
                })
                .then(function (response) {
                    if (response.status != 200) {
                        alert('status error ' + response.status);
                    }
                    else {
                        $scope.newNoteMood = '';
                        $scope.newNoteSubject = '';
                        $scope.newNoteBody = '';

                        getSelectedCustomerNotes();
                    }
                });
        }
    }

    function getSelectedCustomerNotes() {
        $http.get('http://localhost:3000/notes?customerId=' + $scope.selectedCustomer.Id)
            .then(function (response) {
                noteService.setSelectedCustomerNotes(response.data.notes);
                $scope.customerNotes = noteService.getCustomerNotes();
            });
    }

    $scope.editNote = function (note) {
        $scope.editedNote = angular.copy(note);
        $("#editNoteModal").modal();
        $('.moodDivs').removeClass('botBordBlue');
        $('.moodBtn').blur();
    }

    $scope.saveEditedNote = function () {
        if ($scope.editedNote.Subject == '' || $scope.editedNote.Body == '') {
            alert('Please fill out both the subject line and body of before saving.');
        }
        else {
            $('.moodDivs').removeClass('botBordBlue');
            $('.moodBtn').blur();
            $http.put('http://localhost:3000/notes/' + $scope.editedNote.Id, $scope.editedNote)
                .then(function (response) {
                    if (response.status != 200) {
                        alert('error status ' + response.status);
                    }
                    else {
                        getSelectedCustomerNotes();
                    }
                });
        }
    }

    $scope.deleteNote = function (note) {
        var confirmed = confirm('Are you sure you want to permanently delete this note?');

        if (confirmed == true) {
            $http.delete('http://localhost:3000/notes/' + note.Id)
                .then(function (response) {
                    if (response.status != 200) {
                        alert('error status ' + response.status);
                    }
                    else {
                        getSelectedCustomerNotes();
                    }
                });
        }
    }

    /* FULL CONTACT
    **************************************/

    $scope.getFCByEmail = function () {
        console.log($scope.selectedCustomer.Email);
        $scope.fcByEmailShown = true
        $scope.fcEmailStatus = 'searching...';
        $http.get(`http://localhost:3000/customers/byEmail?email=${$scope.selectedCustomer.Email}`)
            .then(function (response) {
                $scope.fcEmailStatus = 'null'
                $scope.fcEmailResults = response.data.object;
                console.log(response.data.object);
            });
    }

    $scope.searchCustomerPhone = function () {
        $scope.fcPhoneResults = 'searching...';
        $http.get(`http://localhost:3000/customers/byPhone?phone=${$scope.selectedCustomer.Phone}`)
            .then(function (response) {
                $scope.fcPhoneResults = response.data.object;
            });
    }

    $scope.hideFCEmailResults = function () {
        $scope.fcByEmailShown = false;
    }

});

