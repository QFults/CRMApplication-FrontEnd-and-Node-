var axios = require('axios');

function index(req, res) {
   axios.get('http://localhost:50313/api/users?email=' + req.query.email + '&password=' + req.query.password)
            .then(function (response) {
                res.json({ user: response.data, userExists: true });
            })
            .catch(function (error) {
                res.json({ userExists: false })
            });
}

module.exports = {
  index: index
}