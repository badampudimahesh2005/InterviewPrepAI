const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (
    `
    You are an AI trained to generate technical interview questions and answers.
    
    Task:
    - Role: ${role}
    - candidate's experience: ${experience} years
    - Topics to focus on: ${topicsToFocus}
    - Number of questions to generate: ${numberOfQuestions}
    - For each question, generate a detailed but beginner-friendly answer.
    - If the answer need a code examles, add a small code block inside .
    - Keep formatting very clean.
    -Return a pure JSON array like:
    [
    {
        "question": "Question here?",
        "answer": "Answer here."
    },
    ...
    ]
    Important: Do NOT add any extra text. Only return valid JSON.
    `
);

const conceptExplainPrompt = (question) => (
    `
    You are an AI trained to explain technical concepts in a simple and clear manner.
    Task:
    - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
    - Question: ${question}
    - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
    - Keep the formatting very clean and clear.
    - Return the result as a valid JSON object in the following format:
    {
    "title": "Short title here?",
    "explanation": "Detailed explanation here."
    }

    Important: Do NOT add any extra text. Only return valid JSON.

    `);


module.exports = {
    questionAnswerPrompt,
    conceptExplainPrompt
};