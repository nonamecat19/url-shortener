const mongoose = require('mongoose')

const planSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    timeout: { type: Number, required: true },
})
const Plan = mongoose.model('Plan', planSchema)

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }
})
const User = mongoose.model('User', userSchema)

const linkSchema = mongoose.Schema({
    url: { type: String, required: true },
    short: {type: String, unique: true, required: true},
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
const Link = mongoose.model('Link', linkSchema)

module.exports = {Link, User, Plan}