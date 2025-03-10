const mongoose = require("mongoose");

const TryoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [
    { 
      text: String, 
      type: { type: String, enum: ["truefalse", "multiplechoice", "shortanswer"] },
      options: [String], 
      correctAnswer: String 
    }
  ],
  submissions: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      answers: [{ questionId: String, answer: String }]
    }
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Tryout", TryoutSchema);
