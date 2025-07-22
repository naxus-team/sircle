const express = require("express");
const verifyToken = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fs = require("fs");
require("dotenv").config();

const router = express.Router();

router.get("/verify", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء التسجيل", error: error.message });
    }
});

module.exports = router;
