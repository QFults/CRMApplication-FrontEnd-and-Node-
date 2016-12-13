var axios = require('axios');

function index(req, res) {
    axios.get('http://localhost:50313/api/users')
        .then(function (response) {
            var users = response.data;
            res.json({ users: users});
        })
        .catch(function (error) {
            console.log(error);
        });
}

function show(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    axios.get('http://localhost:50313/api/users')
        .then(function (response) {
            res.json({ message: 'we found you!'});
        })
        .catch(function (error) {
            console.log(error);
        });
}

function create(req, res) {
    axios.get('http://localhost:50313/api/users')
        .then(function (response) {
            res.json({ message: 'we made you!'});
        })
        .catch(function (error) {
            console.log(error);
        });
}
module.exports = {
    index: index,
    show: show,
    create: create
}