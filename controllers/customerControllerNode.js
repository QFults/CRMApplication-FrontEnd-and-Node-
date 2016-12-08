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

function getCustomerInfo(req, res) {
        var email = req.query.email;
        var config = {
            headers: {'X-FullContact-APIKey': process.env.API_KEY}
        }
axios.get('https://api.fullcontact.com/v2/person.json?email=' + email, config)
.then(function(response) {
    console.log(response);
    res.json({object: response.data });
})
}

module.exports = {
    index: index,
    getCustomerInfo: getCustomerInfo
}