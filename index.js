// implement your API here

const express = require('express')

const Users = require('./data/db.js');

const server = express();

server.use(express.json()); // Middleware to allow express to read JSON data

const port = 5000;

server.listen(port, () => {
    console.log('this is the server!')
});

// GET - See the list of users

server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMsg: 'The users information could not be retrieved.'
        });
    });
});

// GET - see the user by ID

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    Users.findById(id)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({
            errorMsg: 'The user with the specified ID does not exist.'
        });
    });
});

// POST - Create a user

server.post('/api/users', (req, res) => {
    
    const newUser = req.body;
    const {name, bio} = newUser;
    
    Users.insert(newUser)
    .then(user => {
        // Validate data ---
       if(!name || !bio) {
           res.status(400).json({
               errorMsg: 'Please provide name and bio for the user.'
           })
       }
       else {
           res.status(201).json(user)
       }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMsg: 'There was an error while saving the user to the database'
        });
    });
});

// DELETE - Delete a user

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    Users.remove(id)
    .then(response => {
        if(!response) {
            res.status(404).json({
                errorMsg: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMsg: 'The user could not be removed.'
        });
    });
});

// PUT - Updates a user

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const UpdatedUser = req.body;
    const {name, bio} = UpdatedUser;

    Users.update(id, UpdatedUser)
    .then(user => {
        // Validate
        if(!id) {
            res.status(404).json({
                errorMsg: 'The user with the specified ID does not exist.'
            })
        }
        else if(!name || !bio) {
            res.status(400).json({
                errorMsg: 'Please provide name and bio for the user.'
            })
        }
        else {
            res.status(200).json(user).json({
                message: ''
            })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMsg: 'The user information could not be modified.'
        })
    })
})




