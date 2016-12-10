var axios = require('axios');

function index(req, res) {
    axios.get('http://localhost:50313/api/users')
        .then(function (response) {
            var users = response.data;
            res.json({ message: users});
        })
        .catch(function (error) {
            console.log(error);
        });
}

function show(req, res) {
    axios.get('http://localhost:50313/api/users')
        .then(function (response) {
            var users = response.data;
            res.json({ message: users});
        })
        .catch(function (error) {
            console.log(error);
        });
}
module.exports = {
    index: index
}