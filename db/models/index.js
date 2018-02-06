const logs = require('./logs');
const intents = require('./intents');

module.exports = {
  logs,
  intents,
  dbSave
};

/**
 * Save log to db
 * @param {String} question - user query
 * @param {String} userName - user name
 * @param {String} answer - response to user
 * @param {String} channelId - chat id
 * @param {String} intentName - nlp intent name
 * @return {Promise.<>|Promise}
 */
function dbSave(question, userName, answer, channelId, intentName) {
  const log = new Logs({
    question,
    userName,
    answer,
    channelId,
    intentName
  });
  return log
    .save()
    .then()
    .catch(console.error);
}
