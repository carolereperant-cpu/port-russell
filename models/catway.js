const mongoose = require('mongoose');

/**
 * @typedef {Object} Catway
 * @property {number} catwayNumber - Numéro unique du catway
 * @property {string} catwayType - Type : 'long' ou 'short'
 * @property {string} catwayState - Description de l'état
 */
const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro de catway est obligatoire'],
    unique: true
  },
  catwayType: {
    type: String,
    required: [true, 'Le type est obligatoire'],
    enum: ['long', 'short']
  },
  catwayState: {
    type: String,
    required: [true, "L'état est obligatoire"]
  }
});

module.exports = mongoose.model('Catway', catwaySchema);