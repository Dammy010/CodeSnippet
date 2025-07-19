const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const snippetRoutes = require('./routes/snippets');
const { authenticateUser } = require('./middleware/auth');

dotenv.config();
const app = express();

// ✅ Allow both local dev and deployed frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://code-snippet-1vg6.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true, // ✅ Allow credentials (cookies) to be sent
}));

app.use(cookieParser()); // ✅ Parse cookies
app.use(express.json()); // ✅ Parse JSON bodies

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/snippets', authenticateUser, snippetRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Code Snippet backend is running ✅");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

startServer();
