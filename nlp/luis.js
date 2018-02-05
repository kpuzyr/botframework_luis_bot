const request = require('request');
const config = require('../libs/config');
const luisModel = config.get('LUIS_ENDPOINT');
const error = {
  recognition: 'Error in LUIS recognition'
};

module.exports = {
  recognizeMessage: luisRecognizeNative
};

/**
 * Request to LUIS text recognizer
 * @param session
 * @return (Promise) -answer from LUIS
 */
function luisRecognizeNative(session) {
  const text = encodeURIComponent(session.message.text);
  
  return new Promise((resolve, reject) => {
    request.get(`${luisModel}${text}`, (req, res, body) => {
      const recognized = JSON.parse(body);
      if (recognized && recognized.topScoringIntent) {
        resolve(recognized.topScoringIntent.intent);
      } else {
        reject(error.recognition);
      }
    });
  });
}
