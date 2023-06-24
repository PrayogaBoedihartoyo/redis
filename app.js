const express = require('express');
const redis = require('redis');
const app = express();

const client = redis.createClient({
    legacyMode: true,
    host: 'localhost',
    port: 6379,
})
client.connect().catch(console.error)

// Simulasi data pengguna
const users = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com' },
    { id: '4', name: 'Mike Tyson', email: 'miketyson@example.com'}
];

// Simpan data pengguna ke Redis cache
users.forEach((user) => {
    client.hSet('users', user.id, JSON.stringify(user), (err) => {
        if (err) {
            console.log('Error saving user:', err);
        } else {
            console.log(`User ${user.id} saved successfully`);
        }
    });
});

// Endpoint GET all users
app.get('/users', (req, res) => {
    client.hGetAll('users', (err, reply) => {
        if (err) {
            console.log('Error getting users:', err);
        } else {
            res.send(reply);
        }
    });
});

app.get('/users/:id', (req, res) => {
    client.hGet('users', req.params.id, (err, reply) => {
        if (err) {
            return console.log('Error getting user:', err);
        } else {
            return res.send({
                id: req.params.id,
                data: JSON.parse(reply),
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
