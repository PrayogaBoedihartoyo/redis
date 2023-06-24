const dbconnect = require('../database/database.js');
const getAllUsers = (req, res) => {
    try {
        dbconnect.hGetAll('users', (err, reply) => {
            if (err) {
                console.log('Error getting users:', err);
            } else {
                res.send(reply);
            }
        });
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message,
        })
    }
};

const getUserById = (req, res) => {
    try {
        dbconnect.hGet('users', req.params.id, (err, reply) => {
            if (err) {
                return console.log('Error getting user:', err);
            } else {
                return res.send({
                    id: req.params.id,
                    data: JSON.parse(reply),
                });
            }
        });
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message,
        })
    }
}

const createUser = (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = Date.now().toString();

        dbconnect.hSet('users', userId, JSON.stringify({ name, email }), (err, reply) => {
            if (err) {
                return console.log('Error creating user:', err);
            } else {
                return res.send({
                    id: userId,
                    data: JSON.parse(reply),
                });
            }
        });
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message,
        })
    }
}

const updateUser = (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email } = req.body;

        dbconnect.hSet('users', userId, JSON.stringify({ name, email }), (err, reply) => {
            if (err) {
                return console.log('Error updating user:', err);
            } else {
                return res.send({
                    id: userId,
                    data: JSON.parse(reply),
                });
            }
        });
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message,
        })
    }
}

const deleteUser = (req, res) => {
    try {
        dbconnect.hDel('users', req.params.id, (err, reply) => {
            if (err) {
                return console.log('Error deleting user:', err);
            } else {
                return res.send({
                    id: req.params.id,
                    data: JSON.parse(reply),
                });
            }
        });
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message,
        })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}