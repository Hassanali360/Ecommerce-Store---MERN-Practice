// Import packages
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create express app
const app = express();

// MongoDB connection
mongoose.connect("mongodb+srv://hassanmunir083:1234@cluster0.uve9sft.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((error) => console.error("❌ MongoDB connection error:", error));

// Middlewares
app.use(
    cors({
        origin: "http://localhost:5173", // remove space
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
);

app.use(cookieParser()); // call it as a function
app.use(express.json());



// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡ Server running on port ${PORT}`));
