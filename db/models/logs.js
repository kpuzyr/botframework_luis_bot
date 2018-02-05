/**
 * Logs model
 */
const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema(
  {
    question: {
      type: String
    },
    userName: {
      type: String
    },
    answer: {
      type: String
    },
    channelId: {
      type: String
    },
    intentName: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model('Logs', logsSchema);
