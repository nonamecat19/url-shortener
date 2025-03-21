const express = require('express');
const {init} = require('./db');
const {getPlans, seed, createLink, getLinkInfo} = require('./services');
const logger = require('./logger');
require('dotenv/config')
const {getCache, setCache, cacheFunction} = require("./cache");

void init()

const app = express();

app.get('/plans', async (req, res) => {
    logger.info("getPlans")
    const plans = await getPlans();
    res.json(plans)
})

app.post('/seed', async (req, res) => {
    await seed();
    res.json({status: 'ok'})
})

app.post('/url', async (req, res) => {
    const link = await createLink(req.query.url, req.query.label, req.query.user);
    logger.info(`add link: ${link.url}`)
    res.json({link})
})

app.get('/:id', async (req, res) => {
    const cachedGetLinkInfo = cacheFunction(getLinkInfo, 10)
    let info = await cachedGetLinkInfo(req.params.id)

    logger.info(`visit link: ${req.params.id} (${info.url})`)
    const validDomain = info.url.replace(/[^a-zA-Z0-9.-]/g, '');

    setTimeout(() => {
        res.redirect(`https://${validDomain}`);
    }, info.timeout);
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})

