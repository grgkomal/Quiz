// // server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors'); // Required for frontend/backend communication
// const fs = require('fs'); // To read the seed data file

// const app = express();
// const PORT = 3000;
// const DB_URI = 'mongodb://localhost:27017/quizdb'; // Change if using Atlas/different port

// // --- Middleware Setup ---
// // Allow Angular frontend (usually running on port 4200) to access this API
// app.use(cors({
//     origin: 'http://localhost:4200' // Adjust if your Angular app runs on a different port
// }));
// app.use(express.json()); // To parse incoming JSON requests


// // --- 1. MongoDB Connection and Seeding ---
// mongoose.connect(DB_URI)
//     .then(() => {
//         console.log('✅ MongoDB connected successfully.');
//         seedDatabase(); // Call the seed function after successful connection
//     })
//     .catch(err => {
//         console.error('❌ MongoDB connection error:', err);
//     });

// // --- 2. Mongoose Schema and Model ---
// const QuestionSchema = new mongoose.Schema({
//     questionId: { type: Number, required: true, unique: true },
//     questionText: { type: String, required: true },
//     answerText: { type: String, required: true },
//     technology: { type: String, required: true }
// });

// const Question = mongoose.model('Question', QuestionSchema);


// // --- 3. Database Seeding Function ---
// async function seedDatabase() {
//     try {
//         const count = await Question.countDocuments();
//         if (count === 0) {
//             console.log('Database is empty. Seeding initial data...');
            
//             // Read the JSON file
//             const seedData = JSON.parse(fs.readFileSync('qna.json', 'utf8'));

//             // Insert data
//             await Question.insertMany(seedData);
//             console.log(`🚀 Successfully inserted ${seedData.length} questions into the database.`);
//         } else {
//             console.log(`Database already contains ${count} questions. Skipping seed.`);
//         }
//     } catch (error) {
//         // We use insertMany. If a unique key violation happens (like questionId), it will throw an error
//         if (error.code !== 11000) { 
//             console.error('Error during database seeding:', error.message);
//         }
//     }
// }


// // --- 4. API Route ---
// // GET /api/questions: Fetches all questions, sorted by ID for correct order
// // --- 4. API Route ---
// app.get('/api/questions', async (req, res) => {
//     try {
//         const technologyFilter = req.query.tech; // Get the 'tech' query parameter
//         let query = {};

//         // If a 'tech' parameter exists and is not 'All', filter the query
//         if (technologyFilter && technologyFilter !== 'All') {
//             query = { technology: technologyFilter };
//         }
        
//         // Find documents based on the query (which might be empty for 'All')
//         const questions = await Question.find(query).sort({ questionId: 1 });
        
//         res.status(200).json(questions);
//     } catch (err) {
//         console.error("Error fetching questions:", err);
//         res.status(500).json({ message: "Failed to retrieve questions from database." });
//     }
// });


// // --- 5. Start Server ---
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });



// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const DB_URI = 'mongodb://localhost:27017/quizdb';
const JWT_SECRET = process.env.JWT_SECRET || "GroceryStoreManagementSystem";

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(DB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully.');
    seedDatabase();
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- Schema & Model ---
const QuestionSchema = new mongoose.Schema({
  questionId: { type: Number, required: true, unique: true },
  questionText: { type: String, required: true },
  answerText: { type: String, required: true },
  technology: { type: String, required: true },
  options: { type: [String], required: true },
  explanation: { type: String, required: true },
  difficulty: { type: String, required: true },
  referenceUrl: { type: String, required: true }
});
const Question = mongoose.model('Question', QuestionSchema);

// --- Seed Function ---
async function seedDatabase() {
  try {
    const count = await Question.countDocuments();
    if (count === 0) {
      console.log('Database empty. Seeding...');
      const seedData = JSON.parse(fs.readFileSync('qna.json', 'utf8'));
      await Question.insertMany(seedData);
      console.log(`🚀 Inserted ${seedData.length} questions.`);
    } else {
      console.log(`Database already has ${count} questions. Skipping seed.`);
    }
  } catch (error) {
    if (error.code !== 11000) {
      console.error('Seeding error:', error.message);
    }
  }
}

// --- JWT Helpers ---
function createToken(user) {
  const payload = { id: user.id, email: user.email, role: user.role || "USER" };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function jwtAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ status: "error", message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ status: "error", message: "Invalid or expired token" });
  }
  req.user = decoded;
  next();
}

// --- Routes ---
// Hardcoded signin
app.post('/users/signin', (req, res) => {
  const { email, password } = req.body;
  if (email === "qwe@gmail.com" && password === "qwe") {
    const user = { id: 1, email, role: "ADMIN" };
    const token = createToken(user);
    return res.json({ status: "success", token });
  }
  return res.status(401).json({ status: "error", message: "Invalid credentials" });
});

// Protected questions API
app.get('/api/questions', jwtAuth, async (req, res) => {
  try {
    const technologyFilter = req.query.tech;
    let query = {};
    if (technologyFilter && technologyFilter !== 'All') {
      query = { technology: technologyFilter };
    }
    const questions = await Question.find(query).sort({ questionId: 1 });
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Failed to retrieve questions." });
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
