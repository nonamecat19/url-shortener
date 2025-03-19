const mongoose = require('mongoose');
require('dotenv/config')

init().catch(err => console.log(err));

async function init() {
    await mongoose.connect(process.env.MONGO_URL);
}

module.exports = {init};