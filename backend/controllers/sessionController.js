
const Session = require('../models/Session'); 
const Question = require('../models/Question');

// Controller functions for session management

const createSession = async (req, res) => {
    try {

        const { role, experience, topicsToFocus, description, questions } = req.body;

        const userId = req.user._id; 

        const session = new Session({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question;
            })
        );

        session.questions = questionDocs;
        await session.save();
        res.status(201).json({success: true, session});

    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ error: "Internal server error" });
    }   
};

const getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate({
                path: 'questions',
                options: { sort: { isPinned: -1, createdAt: -1 } }
            })
            .exec();

        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }

        res.status(200).json({ success: true, session });

    } catch (error) {
        console.error("Error fetching session by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('questions');
        res.status(200).json(sessions);

    } catch (error) {
        console.error("Error fetching my sessions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const deleteSession = async (req, res) => {
    try {

        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }

        // Check if the session belongs to the user
        if(session.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "You are not authorized to delete this session" });
        }

        //First delete all questions associated with the session
        await Question.deleteMany({ session: session._id });

        //then delete the session
        await session.deleteOne();

        res.status(200).json({ success: true, message: "Session deleted successfully" });



    } catch (error) {
        console.error("Error deleting session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createSession,
    getSessionById,
    getMySessions,
    deleteSession
};
