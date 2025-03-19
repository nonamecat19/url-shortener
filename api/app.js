const express = require('express');
const {init} = require('./db');
const {getPlans} = require('./services');
require('dotenv/config')

void init()

const app = express();

app.get('/plans', async (req, res) => {
    const plans = await getPlans();
    res.json(plans)
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})

