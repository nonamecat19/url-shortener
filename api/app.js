const express = require('express');
const {init} = require('./db');

void init()

const app = express();

app.get('/', (req, res) => {
    res.json({
        status: 'success'
    })
})

app.listen(3000)

