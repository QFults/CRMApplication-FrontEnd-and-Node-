var axios = require('axios');

function test(req, res) {
    res.json({ message: 'customerControllerNode.js file working!'})
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
    test: test,
    getCustomerInfo: getCustomerInfo
}