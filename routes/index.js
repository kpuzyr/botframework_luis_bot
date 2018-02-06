const { dbSave } = require('../db/models/index');
const { recognizeMessage } = require('../nlp/luis');
const errors = {
  intentName: 'Can\'t get intent name',
  intentMessage: 'Error in getting intent message'
};

const routes = {
  init: (bot) => {
    bot.dialog('/', [
      async (session) => {
        session.sendTyping();
        let intentName = '';
        let data = {};
        let answer = '';
        
        try {
          intentName = await recognizeMessage(session);
        } catch (err) {
          console.error(err);
          intentName = null;
          answer = errors.intentName;
        }
        
        try {
          data = await Intents.findOne({ name: intentName });
          if (!data) {
            throw new Error(errors.intentMessage)
          }
        } catch (err) {
          console.error(err);
          answer = errors.intentMessage;
        }
        
        const log = prepare(session, intentName, answer);
        session.send(log.answer);
        session.endConversation();
        dbSave(log.question, log.userName, log.answer, log.channelId, log.intentName);
      }
    ])
  }
};

module.exports = routes;

function prepare(session, intentName, answer) {
  return {
    question: session.message.text,
    userName: session.message.user.name,
    channelId: session.message.address.channelId,
    answer,
    intentName
  };
}