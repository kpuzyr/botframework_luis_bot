const { dbLog } = require('../db/models/index');
const { recognizeMessage } = require('../nlp/luis');

const routes = {
  init: (bot, builder, uniqid, recognizer) => {
    bot.dialog('/', [
      async (session, args, next) => {
        session.sendTyping();
        let message = '';
        
        try {
          message = await recognizeMessage(session);
        } catch (err) {
          message = err;
        }
        
        session.send(message);
        dbLog(session.message.text, 'Nick', 'Some answer', "someId", message);
        session.endConversation();
      }
    ])
  }
};

module.exports = routes;
