const mongoose = require("mongoose");

const passwordAnalysisSchema = new mongoose.Schema({
  passwordLength: { type: Number, required: true },
  score: { type: Number, required: true },
  strength: { type: String, required: true },
  crackTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.PasswordAnalysis ||
  mongoose.model("PasswordAnalysis", passwordAnalysisSchema);
