var axios = require('axios');

function index(req, res) {
    axios.get('http://localhost:50313/api/customers')
        .then(function (response) {
            var customers = response.data;
            res.json({ customers: customers});
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = {
    index: index
}