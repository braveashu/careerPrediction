const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    score: Number,
   
    score2:
       Number,
      timestamp: 
        Date

   
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
