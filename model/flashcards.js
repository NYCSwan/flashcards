var mongoose = require('mongoose');  
var flashcardSchema = new mongoose.Schema({  
  question: {type: String, index: true },
  type: String,
  hint: String,
  answer: String, 
  created_at:{ type: Date, default: Date.now },
  correct?: Boolean
});
mongoose.model('Flashcard', flashcardSchema);