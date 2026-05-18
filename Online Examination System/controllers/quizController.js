const getQuizQuestions = (req, res) => {

    const quizId = req.params.id;

    res.json([
        {
            id: 1,
            question_text: 'Demo Question',
            option1: 'A',
            option2: 'B',
            option3: 'C',
            option4: 'D'
        }
    ]);

};

const submitQuiz = (req, res) => {

    const { answers } = req.body;

    let score = 0;

    answers.forEach(answer => {
        if (answer === 1) {
            score++;
        }
    });

    res.json({
        success: true,
        score: score * 10,
        correct: score,
        total: answers.length
    });

};

module.exports = {
    getQuizQuestions,
    submitQuiz
};