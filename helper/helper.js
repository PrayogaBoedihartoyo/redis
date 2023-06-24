const database = require('../database/database.js');
const seedRedis = () => {
    const client = database;
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
}

module.exports = {
    seedRedis,
}