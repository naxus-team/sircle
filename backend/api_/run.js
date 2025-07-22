require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const https = require("https");
const cors = require("cors");

const app = express();

// تحميل شهادة SSL (لجعل WebRTC يعمل على Brave)
const options = {
    key: fs.readFileSync("192.168.1.100-key.pem"),
    cert: fs.readFileSync("192.168.1.100.pem"),
};

app.use(cors({ origin: "*" })); // السماح بالاتصال من أي مكان

// إنشاء خادم HTTPS
const server = https.createServer(options, app);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const userRes = require("./res/user");
app.use("/api/user", userRes);

const authRes = require("./res/auth");
app.use("/api/auth", authRes);

const classRes = require("./res/class");
app.use("/api/class", classRes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Something went wrong!" });
});

const users = {}; // تخزين المستخدمين المتصلين

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Database connected."))
    .catch((err) => console.error("Database connection refused: ", err));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));