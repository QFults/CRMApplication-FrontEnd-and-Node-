var axios = require('axios');

function index(req, res) {
    if (!req.query.email || !req.query.password) {
        axios.get('http://localhost:50313/api/users')
            .then(function(response) {
                res.json({ users: response.data });
            })
            .catch(function(error) {
            });
    }
    else {
        axios.get('http://localhost:50313/api/users?email=' + req.query.email + '&password=' + req.query.password)
            .then(function(response) {
                res.json({ user: response.data, userExists: true });
            })
            .catch(function(error) {
                res.json({ userExists: false })
            });
    }
}


function show(req, res) {
    axios.get('http://localhost:50313/api/user?id=' + userId)
        .then(function(response) {
            res.json({ message: 'we found you!' });
        })
        .catch(function(error) {
            console.log(error);
        });

}

function create(req, res) {
    axios.get('http://localhost:50313/api/users')
        .then(function(response) {
            res.json({ message: 'we made you!' });
        })
        .catch(function(error) {
            console.log(error);
        });
}
module.exports = {
    index: index,
    show: show,
    create: create
}