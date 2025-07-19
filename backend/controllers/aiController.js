const {GoogleGenAI} = require("@google/genai");

const {conceptExplainPrompt, questionAnswerPrompt} = require("../utils/prompts");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const generateInterviewQuestions = async (req, res) => {
    try {

        const {role, experience, topicsToFocus, numberOfQuestions} = req.body;
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt
        });

        let rawText = response.text;

        //clean it: remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // remove ```json from start
            .replace(/```$/, "") // remove ``` from end
            .trim(); // trim whitespace

        //parse the cleaned text to JSON
        const data = JSON.parse(cleanedText);

        // Return the questions as a JSON response
        res.status(200).json(data);

    } catch (error) {
        console.error("Error generating interview questions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const generateConceptExplanation = async (req, res) => {
    try {

        const {question} = req.body;
        if (!question) {
            return res.status(400).json({ error: "Question is required" });
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt
        });

        let rawText = response.text;

        //clean it: remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // remove ```json from start
            .replace(/```$/, "") // remove ``` from end
            .trim(); // trim whitespace

        //parse the cleaned text to JSON
        const data = JSON.parse(cleanedText);

        // Return the explanation as a JSON response
        res.status(200).json(data);
        
    } catch (error) {
        console.error("Error generating concept explanation:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};


module.exports = {
    generateInterviewQuestions,
    generateConceptExplanation
};