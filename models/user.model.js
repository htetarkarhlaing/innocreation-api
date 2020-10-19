const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);