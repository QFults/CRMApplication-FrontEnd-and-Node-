var axios = require('axios');

function index(req, res) {
    axios.get('http://localhost:50313/api/notes')
        .then(function (response) {
            var notes = response.data;
            res.json({ notes: notes });
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = {
    index: index
}