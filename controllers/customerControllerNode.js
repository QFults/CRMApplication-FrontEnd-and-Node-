var axios = require('axios');

function index(req, res) {
    if (!req.query.userId & !req.query.information) {
        axios.get('http://localhost:50313/api/customers')
            .then(function (response) {
                var customers = response.data;
                res.json({ customers: customers });
            })
            .catch(function (error) {
            });
    }
    else if (!req.query.information) {
        axios.get('http://localhost:50313/api/customers?userId=' + req.query.userId)
            .then(function (response) {
                var customers = response.data;
                res.json({ customers: customers });
            })
            .catch(function (error) {
            });
    }
    else {
        axios.get('http://localhost:50313/api/customers?searchFor=' + req.query.information)
            .then(function (response) {
                res.json({ customers: response.data });
            })
            .catch(function (error) {
            });
    }
}

function searchFCByEmail(req, res) {

    var email = req.query.email;
    var config = {
        headers: { 'X-FullContact-APIKey': process.env.FULL_CONTACT_API_KEY }
    }
    axios.get('https://api.fullcontact.com/v2/person.json?email=' + email, config)
        .then(function (response) {
            res.json({ object: response.data });
        })
}

function searchFCByPhone(req, res) {
    var phone = req.query.phone;
    var config = {
        headers: { 'X-FullContact-APIKey': process.env.FULL_CONTACT_API_KEY }
    }
    axios.get('https://api.fullcontact.com/v2/person.json?phone=' + phone, config)
        .then(function (response) {
            res.json({ object: response.data });
        })
}

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

function update (req, res) {
    axios.put('http://localhost:50313/api/customers/' + req.body.Id, req.body)
        .then(function (response) {
            res.json(response.data)
        })
        .catch(function (error) {
            console.log(error);
            res.json(error);
        })
}

function destroy (req, res) {
    axios.delete('http://localhost:50313/api/customers/?id=' + req.params.id)
        .then(function (response) {
            res.json(response);
        })
        .catch(function (error) {
            res.json(error);
            console.log(error);
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