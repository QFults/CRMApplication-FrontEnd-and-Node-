var axios = require('axios');

//index
function index(req, res) {
    // gets all customers
    if (!req.query.userId & !req.query.information) {
        axios.get('http://localhost:50313/api/customers')
            .then(function (response) {
                var customers = response.data;
                res.json({ customers: customers });
            })
            .catch(function (error) {
            });
    }
    // gets a user's customers
    else if (!req.query.information) {
        axios.get('http://localhost:50313/api/customers?userId=' + req.query.userId)
            .then(function (response) {
                var customers = response.data;
                res.json({ customers: customers });
            })
            .catch(function (error) {
            });
    }
    // gets customers based on any info provided
    else {
        axios.get('http://localhost:50313/api/customers?searchFor=' + req.query.information)
            .then(function (response) {
                res.json({ customers: response.data });
            })
            .catch(function (error) {
            });
    }
}

// searching third party api for more customer information. Done using provided customer email
function searchFCByEmail(req, res) {

    var email = req.query.email;
    var config = {
        headers: { 'X-FullContact-APIKey': process.env.FULL_CONTACT_API_KEY }
    }
    axios.get('https://api.fullcontact.com/v2/person.json?email=' + email, config)
        .then(function (response) {
            res.json({ object: response.data });
        })
        .catch(function (error) {
            res.json(error)
        });
}

// searching third party api for more customer information. Done using provided customer phone number
function searchFCByPhone(req, res) {
    var phone = req.query.phone;
    var config = {
        headers: { 'X-FullContact-APIKey': process.env.FULL_CONTACT_API_KEY }
    }
    axios.get('https://api.fullcontact.com/v2/person.json?phone=' + phone, config)
        .then(function (response) {
            res.json({ object: response.data });
        })
        .catch(function (error) {
            res.json(error)
        });
}

// create function to make a new user
function create(req, res) {
    if (req.body.Email == '' && req.body.Phone == '') {
        res.json({ post: false })
    }
    else {
        axios.post('http://localhost:50313/api/customers', req.body)
            .then(function (response) {
                res.json({ post: true, customer: response.data })
            })
            .catch(function (error) {
                res.json({ post: false })
            })
    }
}

// update function to change the information about a customer
function update(req, res) {
    axios.put('http://localhost:50313/api/customers/' + req.body.Id, req.body)
        .then(function (response) {
            res.json(response.data)
        })
        .catch(function (error) {
            res.json(error);
        })
}

// destroy function to remove a customer from the database
function destroy(req, res) {
    axios.delete('http://localhost:50313/api/customers/?id=' + req.params.id)
        .then(function (response) {
            res.json(response);
        })
        .catch(function (error) {
            res.json(error);
        });
}

module.exports = {
    index: index,
    searchFCByEmail: searchFCByEmail,
    searchFCByPhone: searchFCByPhone,
    create: create,
    update: update,
    destroy: destroy
}