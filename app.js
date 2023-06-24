const express = require('express');
const {
    getAllUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser
} = require("./controller/controller");
const bodyParser = require("express");
const app = express();
app.use(bodyParser.json());


app.get('/users', (req, res) => getAllUsers(req, res));
app.get('/users/:id', (req, res) => getUserById(req, res));
app.put('/users/:id', (req, res) => updateUser(req, res));
app.post('/users', (req, res) => createUser(req, res));
app.delete('/users/:id', (req, res) => deleteUser(req, res));

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
