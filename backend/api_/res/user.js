const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fs = require("fs");
require("dotenv").config();

const router = express.Router();

router.delete("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id; // 📌 الحصول على ID من الـ URL

        // ✅ البحث عن المستخدم وحذفه
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "المستخدم غير موجود" });
        }

        res.status(200).json({ message: "تم حذف المستخدم بنجاح", user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء الحذف", error });
    }
});

router.delete("/users", async (req, res) => {
    try {
        await User.deleteMany(); // حذف جميع المستخدمين
        res.status(200).json({ message: "تم حذف جميع المستخدمين بنجاح!" });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء حذف المستخدمين", error });
    }
});

router.get("/:username", async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username }); // جلب المستخدم من MongoDB
    if (!user) {
        return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    res.json(user);
});

router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const { token, key } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { token, key }, // Update token and key
            { new: true }   // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "المستخدم غير موجود" });
        }

        res.status(200).json({ message: "تم تحديث المستخدم بنجاح", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء التحديث", error });
    }
});


router.get("/users", async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Send the users as a response
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء جلب المستخدمين", error });
    }
});

const privateKey = fs.readFileSync("./res/private.key", "utf8");

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ البحث عن المستخدم في قاعدة البيانات
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "البريد الإلكتروني غير مسجل" });

        // 2️⃣ التحقق من صحة كلمة المرور
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "كلمة المرور غير صحيحة" });

        // 3️⃣ إنشاء توكن JWT باستخدام RSA
        const token = jwt.sign(
            { userId: user._id },
            privateKey,
            { algorithm: "RS256", expiresIn: "7d" }
        );

        res.json({ message: "تم تسجيل الدخول بنجاح!", token });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدخول", error: error.message });
    }
});

// تسجيل مستخدم جديد
router.post("/register", async (req, res) => {
    try {
        const { firstname, middlename, lastname, username, email, nsim, password, token, key } = req.body;

        // 1️⃣ التحقق من وجود المستخدم مسبقًا
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "البريد الإلكتروني مستخدم مسبقًا" });

        // 2️⃣ تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3️⃣ إنشاء مستخدم جديد
        const newUser = new User({ firstname, middlename, lastname, username, email, nsim, password: hashedPassword, token, key });
        await newUser.save();

        // 4️⃣ إنشاء JSON Web Token
        const tokenAuth = jwt.sign(
            { userId: newUser._id },
            privateKey,
            { algorithm: "RS256", expiresIn: "7d" }
        );
        res.status(201).json({ message: "تم إنشاء الحساب بنجاح!", tokenAuth });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء التسجيل", error: error.message });
    }
});

module.exports = router;
