const Question = require("../models/Question");
const Session = require("../models/Session");


const addQuestionToSession = async (req, res) => {
    try {
        const {sessionId, questions} = req.body;
        if(!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ error: "Invalid input data" });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }

        //create a new question for each question in the array
        const createdQuestions = await Question.insertMany(
            questions.map(q => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );

        //update the session with the new questions
        session.questions.push(...createdQuestions.map(q => q._id));

        await session.save();

        res.status(201).json({ createdQuestions });

    }catch (error) {
        console.error("Error adding question to session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const togglePinQuestion = async (req, res) => {
    try {

        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({ success: true, question });

    } catch (error) {
        console.error("Error toggling pin status of question:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const updateQuestionNote = async (req, res) => {
    try {
        const { note } = req.body;

        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        question.note = note || "";

        await question.save();

        res.status(200).json({ success: true, question });

    } catch (error) {
        console.error("Error updating question note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    addQuestionToSession,
    togglePinQuestion,
    updateQuestionNote
};