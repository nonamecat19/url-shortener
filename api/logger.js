const winston = require('winston')

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: '../log.txt'}),
    ]
})

module.exports = logger