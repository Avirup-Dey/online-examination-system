const db = require('../database/db');

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

const getQuizQuestions = (req, res) => {

    const subjectId = req.params.id;

    db.query(

        `SELECT
            id,
            question_text,
            option1,
            option2,
            option3,
            option4
         FROM questions
         WHERE subject_id = ?`,

        [subjectId],

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

const submitQuiz = (req, res) => {

    const {
        subject_id,
        answers
    } = req.body;

    const userId = req.session.user.id;

    db.query(

        'SELECT * FROM questions WHERE subject_id = ?',

        [subject_id],

        (err, questions) => {

            if (err) {

                return res.json({
                    success: false,
                    error: err.message
                });

            }

            let correct = 0;

            questions.forEach(question => {

                const userAnswer =
                    answers[question.id];

                if (

                    parseInt(userAnswer) ===
                    question.correct_option

                ) {

                    correct++;

                }

            });

            const total = questions.length;

            const percentage =

                total > 0

                    ? (
                        (correct / total) * 100
                    ).toFixed(2)

                    : 0;

            db.query(

                `INSERT INTO results
                (
                    user_id,
                    subject_id,
                    score,
                    total_questions,
                    percentage
                )
                VALUES (?, ?, ?, ?, ?)`,

                [
                    userId,
                    subject_id,
                    correct,
                    total,
                    percentage
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

                        score: correct,

                        total,

                        percentage

                    });

                }

            );

        }

    );

};

const getHistory = (req, res) => {

    const userId = req.session.user.id;

    db.query(

        `SELECT

            results.*,

            subjects.name AS subject_name

         FROM results

         JOIN subjects

         ON results.subject_id = subjects.id

         WHERE results.user_id = ?

         ORDER BY results.submitted_at DESC`,

        [userId],

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

    getSubjects,

    getQuizQuestions,

    submitQuiz,

    getHistory

};