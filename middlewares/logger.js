const { format } = require('date-fns')
const fsPromises = require('fs').promises;
const { v4: uuid } = require('uuid')
const fs = require('fs');
const path = require('path');

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\thh:mm:ss')
  const logData = `${dateTime}\t${uuid()}\t${message}\n`
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logData)
  } catch (error) {
    console.log(`error ${error}`)
  }
}

const logger = (req, res, next) => {
  const { method, url, headers } = req
  logEvents(`${method}\t${url}\t${headers.origin}`, 'req.log')
  next()
}

module.exports = { logEvents, logger }