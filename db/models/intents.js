/**
 * Intents model
 */
const mongoose = require('mongoose');

const intentsSchema = new mongoose.Schema(
  {
    message: {
      type: String
    },
    name: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model('Intents', intentsSchema);
