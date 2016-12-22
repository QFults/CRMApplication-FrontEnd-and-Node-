var axios = require('axios');

// index function to get notes
function index(req, res) {
    // returns all notes
    if ( !req.query.customerId ) {
        axios.get('http://localhost:50313/api/notes')
            .then(function (response) {
                var notes = response.data;
                res.json({ notes: notes });
            })
            .catch(function (error) {
                res.json(error);
            });
    }
    // only returns notes for a specified customer
    else {
        axios.get('http://localhost:50313/api/notes?customerId=' + req.query.customerId)
        .then(function (response) {
            var notes = response.data;
            res.json({ notes: notes });
        })
        .catch(function (error) {
            res.json(error);
        });
    }
}

// create function to make a new note
function create (req, res) {
    axios.post('http://localhost:50313/api/notes', req.body)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error);
        });
}

// update function to modify an existing note
function update (req, res) {
    axios.put('http://localhost:50313/api/notes/' + req.body.Id, req.body)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error);
        })
}

// destroy function to remove a note from the database
function destroy (req, res) {
    axios.delete('http://localhost:50313/api/notes/?id=' + req.params.id)
        .then(function (response) {
            res.json(response);
        })
        .catch(function (error) {
            res.json(error);
        });
}

module.exports = {
    index: index,
    create: create,
    destroy: destroy,
    update: update
}