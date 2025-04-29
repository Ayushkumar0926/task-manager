const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

// After app.use(cors()); and app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 👉 HARD-CODE your MongoDB URL and Secret here
const MONGO_URI = "mongodb://localhost:27017/taskManager";
const JWT_SECRET = "your_secret_key_here";

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = 5000; // or any port you like

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.log(err));