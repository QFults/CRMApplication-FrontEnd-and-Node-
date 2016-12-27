angular.module("CRMApp").controller("customerController", function ($scope, $http, customerService, userService, noteService, $state) {

// check to make sure user has logged in
    if (document.cookie == "") {
        $state.go('login')
    }
    // returns all of the users in the database
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
    $scope.editedNote;
    $scope.editedNotes = [];
    $scope.originalNote;
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

  $scope.dismissModal = function () {
    $('#createNewCustomerModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

// initializes the logged in user
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

// sends the user to the home page
    $scope.goHome = function() {
                $('.submenu').hide();
                $state.go('home');        
    }
    // logout function to kiick user out of their account
    $scope.logout = function() {
                $http.get('http://localhost:3000/clearcookie')
            .then(function (response) {
                $state.go('login');
                $('.submenu').hide();
            })
    }

// function to return formatted current date
    function returnDate() {
        var now = new Date();
        return (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes()
    }

    /* CUSTOMERS
    ****************************************/

// sets the selected Customer to view the page for
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

// posts a new customer
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
                    alert('You must enter an Email to create a new Customer')
                }
                else {
                    customerService.setSelectedCustomer(response.data.customer);
                    $state.go('customer')

                    $scope.selectedCustomer = customerService.getSelectedCustomer();
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

                    $scope.dismissModal();
                }
            })
    }

    // Edit Customer Modal
    $scope.editCustomerModal = function () {
        $scope.editedCustomer = angular.copy($scope.selectedCustomer);
        $("#editCustomerModal").modal();
    }

// edits a customer's information
    $scope.saveEditedCustomer = function () {
        $http.put('http://localhost:3000/customers/' + $scope.selectedCustomer.Id, $scope.editedCustomer)
            .then(function (response) {
                // this works, but maybe run get customers by user id instead?
                $scope.selectedCustomer = $scope.editedCustomer;
            });
    }

// changes which user a customer belongs to
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

// returns all users in the database
    function getAllUsers() {
        $http.get('http://localhost:3000/users/')
            .then(function (response) {
                userService.setAllUsers(response.data.users);
                $scope.users = userService.getAllUsers();
            })
    }

// sets the user who's customers you wish to iew
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

// edits a users information
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

// removes a users account
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

//opens up a customer page to allow the user to reassign them 
    $scope.reassignCustomer = function (customer) {
        customerService.setSelectedCustomer(customer);
        $scope.selectedCustomer = customerService.getSelectedCustomer();
        $scope.customerNotes = noteService.getCustomerNotes();
        $('#deleteUserModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $state.go('customer')
    }

// sets the selected user
    $scope.setSelectedUser = function (userObj) {
        $scope.selectedUser = userObj;
        userService.setSelectedUser(userObj);
        $scope.selectedUserName = userObj.FirstName + " " + userObj.LastName;
        $scope.findUserCustomers();
    }

// searches to find a users customers
    $scope.findUserCustomers = function () {
        $http.get(`http://localhost:3000/customers?userId=${$scope.selectedUser.Id}`)
            .then(function (response) {
                $scope.isSearching = true;
                $scope.displayedCustomers = response.data.customers

            })
    }

// searches for customers that match any information passed in
    $scope.findCustomer = function () {
        $http.get(`http://localhost:3000/customers?information=${$scope.customerInfo}`)
            .then(function (response) {
                $scope.isSearching = true;
                $scope.displayedCustomers = response.data.customers;
            })
    }

    /* NOTES
    **************************************/

// sets a mood review for an interaction with a customer
    $scope.viewNoteEditHistory = function (note) {
        $scope.noteId = note.Id;
        $http.get('http://localhost:3000/noteEdits?noteId=' + $scope.noteId)
            .then(function (response) {

                noteService.setEditedNotes(response.data);
                $scope.editedNotes = noteService.getEditedNotes();
            })
        $("#editedNoteHistoryModal").modal();
    }

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

// saves a new note
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

// returns a selected customers notes
    function getSelectedCustomerNotes() {
        $http.get('http://localhost:3000/notes?customerId=' + $scope.selectedCustomer.Id)
            .then(function (response) {
                noteService.setSelectedCustomerNotes(response.data.notes);
                $scope.customerNotes = noteService.getCustomerNotes();
            });
    }

// modifies the notes of a specified customer
    $scope.editNote = function (note) {
        $scope.uneditedNote = note;
        $scope.editedNote = angular.copy(note);
        $scope.editedNoteCopy = angular.copy(note);
        $("#editNoteModal").modal();
        $('.moodDivs').removeClass('botBordBlue');
        $('.moodBtn').blur();
    }

// saves teh changes of an edited note
    $scope.saveEditedNote = function () {
        if ($scope.editedNote.Subject == '' || $scope.editedNote.Body == '') {
            alert('Please fill out both the subject line and body of before saving.');
        }
        else if ( $scope.uneditedNote.Subject != $scope.editedNote.Subject || $scope.uneditedNote.Body != $scope.editedNote.Body || $scope.uneditedNote.Mood != $scope.editedNote.Mood ) {
            $('.moodDivs').removeClass('botBordBlue');
            $('.moodBtn').blur();
            var authorName = $scope.loggedInUser.FirstName + ' ' + $scope.loggedInUser.LastName;

            $scope.editedNote.LastEditDate = returnDate();
            $scope.editedNote.LastEditAuthor = authorName;

            $scope.recordedEdit = {};
            $scope.recordedEdit.DateEdited = returnDate();
            $scope.recordedEdit.Author = authorName;
            $scope.recordedEdit.Subject = $scope.editedNote.Subject;
            $scope.recordedEdit.Body = $scope.editedNote.Body;
            $scope.recordedEdit.Mood = $scope.editedNote.Mood;
            $scope.recordedEdit.CustomerId = $scope.editedNote.CustomerId;
            // setting FK - many recordedEdits per note
            $scope.recordedEdit.NoteId = $scope.editedNote.Id;
            
            $http.put('http://localhost:3000/notes/' + $scope.editedNote.Id, $scope.editedNote)
                .then(function (response) {
                    if (response.status != 200) {
                        alert('error status ' + response.status);
                    }
                    else {
                        getSelectedCustomerNotes();

                        $http.post('http://localhost:3000/noteEdits',
                        $scope.recordedEdit
                        )
                            .then(function (response) {
                                if ( response.status != 200 ) {
                                    console.log(response.data);
                                }
                            })
                    }
                });
        }
    }

// removes a note from the database
    $scope.deleteNote = function (note) {
        var confirmed = confirm('Are you sure you want to permanently delete this note?');

        if (confirmed == true) {
            $http.delete('http://localhost:3000/noteedits?NoteId=' + note.Id)
                .then(function (response) {
                    if ( response.status != 200 ) {
                        alert('error status ' + response.status);
                    }
                    else {
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
                })
            
        }
    }

    /* FULL CONTACT
    **************************************/

// returns email information from full contact api
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

// returns phone number information from full contact api
    $scope.searchCustomerPhone = function () {
        $scope.fcPhoneResults = 'searching...';
        $http.get(`http://localhost:3000/customers/byPhone?phone=${$scope.selectedCustomer.Phone}`)
            .then(function (response) {
                $scope.fcPhoneResults = response.data.object;
            });
    }

// hides the returned infromation from full contact api
    $scope.hideFCEmailResults = function () {
        $scope.fcByEmailShown = false;
    }

});

