var axios = require('axios');

// get all notes or option to get notes by customer id
function index(req, res) {
    if ( !req.query.customerId ) {
        axios.get('http://localhost:50313/api/notes')
            .then(function (response) {
                var notes = response.data;
                res.json({ notes: notes });
            })
            .catch(function (error) {
                console.log(error);
                res.json(error);
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
            res.json(error);
        });
    }
}

function create (req, res) {
    axios.post('http://localhost:50313/api/notes', req.body)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error);
        });
}

function update (req, res) {
    axios.put('http://localhost:50313/api/notes/' + req.body.Id, req.body)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
            res.json(error);
        })
}

function destroy (req, res) {
    axios.delete('http://localhost:50313/api/notes/?id=' + req.params.id)
        .then(function (response) {
            res.json('deleted');
        })
        .catch(function (error) {
            res.json('error');
        });
}

module.exports = {
    index: index,
    create: create,
    destroy: destroy,
    update: update
}