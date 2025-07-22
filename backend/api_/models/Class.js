const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    class_code: {
        type: String,
        required: true,
        unique: true
    },
    class_name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false });

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
