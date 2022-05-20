const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarSet: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: "",
    }
});

module.exports = mongoose.model('User', UserSchema);