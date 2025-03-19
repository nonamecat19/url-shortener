const mongoose = require('mongoose')

const planSchema = mongoose.Schema({
    name: { type: String, required: true },
    timeout: { type: Number, required: true },
})
const Plan = mongoose.model('Plan', planSchema)

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    plan: planSchema
})
const User = mongoose.model('User', userSchema)

const linkSchema = mongoose.Schema({
    url: { type: String, unique: true, required: true },
    short: {type: String, unique: true, required: true},
    date: { type: Date, default: Date.now },
    user: userSchema
})
const Link = mongoose.model('Link', linkSchema)

module.exports = {Link, User, Plan}