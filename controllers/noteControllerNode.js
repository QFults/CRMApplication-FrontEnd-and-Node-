var axios = require('axios');

// get all notes or option to get notes by customer id
function index(req, res) {
    console.log('note controller node');
    if ( !req.query.customerId ) {
        axios.get('http://localhost:50313/api/notes')
            .then(function (response) {
                var notes = response.data;
                res.json({ notes: notes });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        axios.get('http://localhost:50313/api/notes?customerId=' + req.query.customerId)
        .then(function (response) {
            var notes = response.data;
            res.json({ notes: notes });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

module.exports = {
    index: index
}