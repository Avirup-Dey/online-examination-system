const db = require('../database/db');

const getDashboard = (req, res) => {

    const stats = {

        totalSubjects: 0,

        totalQuestions: 0,

        totalUsers: 0,

        totalAttempts: 0

    };

    db.query(

        'SELECT COUNT(*) AS total FROM subjects',

        (err, subjects) => {

            if (err) {

                return res.json({

                    success: false,

                    error: err.message

                });

            }

            stats.totalSubjects =
                subjects[0].total;

            db.query(

                'SELECT COUNT(*) AS total FROM questions',

                (err, questions) => {

                    if (err) {

                        return res.json({

                            success: false,

                            error: err.message

                        });

                    }

                    stats.totalQuestions =
                        questions[0].total;

                    db.query(

                        'SELECT COUNT(*) AS total FROM users',

                        (err, users) => {

                            if (err) {

                                return res.json({

                                    success: false,

                                    error: err.message

                                });

                            }

                            stats.totalUsers =
                                users[0].total;

                            db.query(

                                'SELECT COUNT(*) AS total FROM results',

                                (err, attempts) => {

                                    if (err) {

                                        return res.json({

                                            success: false,

                                            error: err.message

                                        });

                                    }

                                    stats.totalAttempts =
                                        attempts[0].total;

                                    res.json({

                                        success: true,

                                        stats

                                    });

                                }

                            );

                        }

                    );

                }

            );

        }

    );

};

const getSubjects = (req, res) => {

    db.query(

        'SELECT * FROM subjects ORDER BY created_at DESC',

        (err, results) => {

            if (err) {

                return res.json({

                    success: false,

                    error: err.message

                });

            }

            res.json(results);

        }

    );

};

const createSubject = (req, res) => {

    const {
        name,
        description
    } = req.body;

    if (!name) {

        return res.json({

            success: false,

            error: 'Subject name is required'

        });

    }

    db.query(

        'INSERT INTO subjects (name, description) VALUES (?, ?)',

        [name, description],

        (err, result) => {

            if (err) {

                return res.json({

                    success: false,

                    error: err.message

                });

            }

            res.json({

                success: true,

                message: 'Subject created successfully'

            });

        }

    );

};

const getQuestions = (req, res) => {

    db.query(

        `SELECT

            questions.*,

            subjects.name AS subject_name

         FROM questions

         JOIN subjects

         ON questions.subject_id = subjects.id

         ORDER BY questions.created_at DESC`,

        (err, results) => {

            if (err) {

                return res.json({

                    success: false,

                    error: err.message

                });

            }

            res.json(results);

        }

    );

};

const createQuestion = (req, res) => {

    const {

        subject_id,

        question_text,

        option1,

        option2,

        option3,

        option4,

        correct_option

    } = req.body;

    if (

        !subject_id ||

        !question_text ||

        !option1 ||

        !option2 ||

        !option3 ||

        !option4 ||

        !correct_option

    ) {

        return res.json({

            success: false,

            error: 'All fields are required'

        });

    }

    db.query(

        `INSERT INTO questions

        (

            subject_id,

            question_text,

            option1,

            option2,

            option3,

            option4,

            correct_option

        )

        VALUES (?, ?, ?, ?, ?, ?, ?)`,

        [

            subject_id,

            question_text,

            option1,

            option2,

            option3,

            option4,

            correct_option

        ],

        (err, result) => {

            if (err) {

                return res.json({

                    success: false,

                    error: err.message

                });

            }

            res.json({

                success: true,

                message: 'Question added successfully'

            });

        }

    );

};

const deleteQuestion = (req, res) => {

    const questionId =
        req.params.id;

    db.query(

        'DELETE FROM questions WHERE id = ?',

        [questionId],

        (err, result) => {

            if (err) {

                return res.json({

                    success: false,

                    error: err.message

                });

            }

            res.json({

                success: true,

                message:
                    'Question deleted successfully'

            });

        }

    );

};

const getUsers = (req, res) => {

    db.query(

        `SELECT

            id,

            name,

            email,

            role,

            created_at

         FROM users

         ORDER BY created_at DESC`,

        (err, results) => {

            if (err) {

                return res.json({

                    success: false,

                    error: err.message

                });

            }

            res.json(results);

        }

    );

};

const getResults = (req, res) => {

    db.query(

        `SELECT

            results.*,

            users.name AS student_name,

            subjects.name AS subject_name

         FROM results

         JOIN users

         ON results.user_id = users.id

         JOIN subjects

         ON results.subject_id = subjects.id

         ORDER BY results.submitted_at DESC`,

        (err, results) => {

            if (err) {

                return res.json({

                    success: false,

                    error: err.message

                });

            }

            res.json(results);

        }

    );

};

module.exports = {

    getDashboard,

    getSubjects,

    createSubject,

    getQuestions,

    createQuestion,

    deleteQuestion,

    getUsers,

    getResults

};