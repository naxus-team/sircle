const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        unique: true,
    }, bio: {
        type: String,
        unique: true,
        maxlength: 200,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    nsim: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
    key: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false });

const User = mongoose.model("User", userSchema);

module.exports = User;
