const logs = require('./logs');

module.exports = {
  logs,
  dbLog
};

/**
 * Save log to db
 * @param {String} question - user query
 * @param {String} userName - user name
 * @param {String} answer - response to user
 * @param {String} channelId - chat id
 * @param {String} intentName - nlp intent name
 * @return {Promise.<T>|Promise}
 */
function dbLog(question, userName, answer, channelId, intentName) {
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
