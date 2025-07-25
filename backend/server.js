require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { generateConceptExplanation, generateInterviewQuestions } = require("./controllers/aiController");

const app = express();

// Middleware to handle CORS
//what is cors?
// CORS (Cross-Origin Resource Sharing) is a security feature that allows or 
// restricts resources on a web page to be requested from another domain 
// outside the domain from which the first resource was served.
// It is used to allow or restrict requests from different origins (domains, protocols, or ports).

app.use(
    cors({
    origin: "*", // Allow all origins, you can specify a specific origin if needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
})
);

connectDB();


//Middlewares
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", generateInterviewQuestions);
app.use("/api/ai/generate-explanation", generateConceptExplanation);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));


//start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});