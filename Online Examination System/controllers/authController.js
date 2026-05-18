const db = require('../database/db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {

    try {

        const { name, email, password, admin } = req.body;

        if (!name || !email || !password) {
            return res.json({
                success: false,
                error: 'All fields are required'
            });
        }

        const role = admin ? 'admin' : 'user';

        db.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (err, results) => {

                if (results.length > 0) {
                    return res.json({
                        success: false,
                        error: 'Email already exists'
                    });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                    [name, email, hashedPassword, role],
                    (err, result) => {

                        if (err) {
                            return res.json({
                                success: false,
                                error: err.message
                            });
                        }

                        req.session.user = {
                            id: result.insertId,
                            name,
                            email,
                            role
                        };

                        res.json({
                            success: true,
                            role
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.json({
            success: false,
            error: error.message
        });

    }

};

const loginUser = async (req, res) => {

    try {

        const { email, password, admin } = req.body;

        db.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (err, results) => {

                if (results.length === 0) {
                    return res.json({
                        success: false,
                        error: 'Invalid email or password'
                    });
                }

                const user = results[0];

                const validPassword = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!validPassword) {
                    return res.json({
                        success: false,
                        error: 'Invalid email or password'
                    });
                }

                if (admin && user.role !== 'admin') {
                    return res.json({
                        success: false,
                        error: 'Not an admin account'
                    });
                }

                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };

                res.json({
                    success: true,
                    role: user.role
                });

            }
        );

    } catch (error) {

        res.json({
            success: false,
            error: error.message
        });

    }

};

const logoutUser = (req, res) => {

    req.session.destroy(() => {

        res.json({
            success: true
        });

    });

};

const getCurrentUser = (req, res) => {

    if (!req.session.user) {
        return res.json(null);
    }

    res.json(req.session.user);

};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};