const {User, Link, Plan} = require('./models')

async function seed() {
    const plan1 = new Plan({name: "Basic", timeout: 5000})
    const plan2 = new Plan({name: "Pro", timeout: 500})
    const plan3 = new Plan({name: "Enterprise", timeout: 0})
    await Promise.all([plan1.save(), plan2.save(), plan3.save()])

    const user1 = new User({name: "Tom", plan: plan1._id})
    const user2 = new User({name: "John", plan: plan2._id})
    const user3 = new User({name: "Jack", plan: plan3._id})
    await Promise.all([user1.save(), user2.save(), user3.save()])
}

function getPlans() {
    return Plan.find({})
}

function getRandomUrlChars(length = 5) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

async function createLink(url, label, user) {
    const short = getRandomUrlChars()
    const link = new Link({url, short, label, user})
    await link.save()
    return link
}

async function getLinkInfo(short) {
    const {url, user} = await Link
        .findOne({short})
        .populate({
            path: 'user',
            populate: {
                path: 'plan',
                select: ['name', 'timeout', '-_id']
            },
            select: ['user', '-_id'],
        })
        .select(['url', '-_id'])
        .exec()

    return {
        url,
        timeout: user.plan.timeout,
        planName: user.plan.name,
    }
}

module.exports = {seed, getPlans, createLink, getLinkInfo};