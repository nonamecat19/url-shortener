const mongoose = require('mongoose')

const Link = mongoose.Schema({
    url: { type: String, unique: true, required: true },
    short: {type: String, unique: true, required: true},
    date: { type: Date, default: Date.now },
    user: User
})

const User = mongoose.Schema({
    name: { type: String, required: true },
    plan: Plan
})

const Plan = mongoose.Schema({
    name: { type: String, required: true },
    timeout: { type: Number, required: true },
})

module.exports = {Link, User, Plan}