/**
 * Npm modules
 */
const restify = require('restify');
const logger = require('morgan');
const path = require('path');
const uniqid = require('uniqid');
const builder = require('botbuilder');
const bodyParser = require('body-parser');
const morgan = require('morgan');

/**
 * Local modules
 */
const log = require('./libs/logs').log(module);
const config = require('./libs/config');
const routes = require('./routes/index');
const db = require('./db');
const luisModel = config.get('LUIS_ENDPOINT');

/**
 * Setup server
 * @type {*|Function}
 */
const server = restify.createServer();
server.use(restify.plugins.queryParser({ mapParams: false }));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.gzipResponse());
server.use(morgan('div'));
server.listen(config.get('PORT'), () => {
  log.info('%s listening to %s', server.name, server.url);
});
server.get('/',(req, res, next) => {
  res.send('Server is working');
  return next();
});

/**
 * Create chat connector for communicating with the Bot Framework Service
 * @type {ChatConnector}
 */
const connector = new builder.ChatConnector({
  appId: config.get('MICROSOFT_APP_ID'),
  appPassword: config.get('MICROSOFT_APP_PASSWORD')
});

/**
 * Create bot instance
 * @type {UniversalBot}
 */
const bot = new builder.UniversalBot(connector);
const recognizer = new builder.LuisRecognizer(luisModel);

/**
 * Listen for messages from users
 */
server.post('/api/messages', connector.listen());

/**
 * Create connection to db. Initialize router.
 */
db
  .init(config.get('MONGO_URL'))
  .then(() => {
    return routes.init(bot, builder, uniqid, recognizer);
  })
  .catch(error => {
    console.log(error);
    // Raven.captureException(error);
  });
