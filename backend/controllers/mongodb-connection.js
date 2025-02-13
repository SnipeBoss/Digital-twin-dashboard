const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Initialize Express App
const app = express();
const MONGO_URL = "mongodb://localhost:27019/mongo-db";
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB with error handling
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Check MongoDB connection
const db = mongoose.connection;
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// MongoDB Schema
const sensorSchema = new mongoose.Schema({}, { strict: false });
const SensorData = mongoose.model("SensorData", sensorSchema, "sensorData");

// GET method with debugging logs
app.get("/", async (req, res) => {
    try {
        console.log("Fetching data from MongoDB...");
        const data = await SensorData.find().sort({ Timestamp: -1 }).limit(100);
        
        if (!data.length) {
            console.log("No data found in MongoDB.");
        } else {
            console.log(`Fetched ${data.length} records`);
        }

        // Convert `_id` to string
        const formattedData = data.map(doc => ({
            ...doc.toObject(),
            _id: doc._id.toString()
        }));

        res.json(formattedData);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: err.message });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
