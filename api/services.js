const {User, Link, Plan} = require('./models')


// const seed =  () => {
//     new Plan({name: "Basic", timeout: 5000}).save()
//     new Plan({name: "Pro", timeout: 500}).save()
//     new Plan({name: "Enterprise", timeout: 0}).save()
// }
//
// module.exports = seed

function getPlans() {
    return Plan.find({})
}

module.exports = {getPlans};