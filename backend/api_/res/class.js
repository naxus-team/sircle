const express = require("express");
const { customAlphabet } = require("nanoid");
const verifyToken = require("../middleware/class");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Class = require("../models/Class");
const fs = require("fs");
require("dotenv").config();

const router = express.Router();

const generateNumericId = customAlphabet("0123456789", 16);

router.get("/:class_code", async (req, res) => {
    const { class_code } = req.params;

    console.error(class_code);

    const classData = await Class.findOne({ class_code });
    if (!classData) {
        return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    res.json(classData);
});



router.delete("/classes", async (req, res) => {
    try {
        await Class.deleteMany(); // حذف جميع المستخدمين
        res.status(200).json({ message: "تم حذف جميع المستخدمين بنجاح!" });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء حذف المستخدمين", error });
    }
});



router.delete("/class/:id", async (req, res) => {
    try {
        const userId = req.params.id; // 📌 الحصول على ID من الـ URL

        // ✅ البحث عن المستخدم وحذفه
        const deletedUser = await Class.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "المستخدم غير موجود" });
        }

        res.status(200).json({ message: "تم حذف المستخدم بنجاح", user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء الحذف", error });
    }
});

router.post("/create", async (req, res) => {
    try {
        const { class_name } = req.body;

        if (!class_name) {
            return res.status(400).json({ error: "class_name is required" });
        }

        // 1️⃣ التحقق من وجود الصف مسبقًا باستخدام class_name
        const existingClass = await Class.findOne({ class_name });
        if (existingClass) {
            return res.status(400).json({ message: "The class name already exists" });
        }

        // 2️⃣ إنشاء class_code رقمي فريد بطول 16
        let classCode;
        let isUnique = false;

        while (!isUnique) {
            classCode = generateNumericId(); // إنشاء class_code رقمي بطول 16
            const existingClassWithCode = await Class.findOne({ class_code: classCode }); // التحقق من وجود class_code مسبقًا
            if (!existingClassWithCode) {
                isUnique = true; // إذا كان class_code غير موجود، نخرج من الحلقة
            }
        }

        // 3️⃣ إنشاء صف جديد مع class_code رقمي فريد
        const newClass = new Class({ class_code: classCode, class_name });
        await newClass.save();

        res.status(201).json({ message: "تم إنشاء الصف بنجاح!", class_code: classCode });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء إنشاء الصف", error: error.message });
    }
});

module.exports = router;
