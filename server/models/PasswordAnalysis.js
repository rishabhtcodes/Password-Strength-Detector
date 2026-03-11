const mongoose = require("mongoose");

const passwordAnalysisSchema = new mongoose.Schema({
  password: { type: String, required: true },
  score: { type: Number, required: true },
  strength: { type: String, required: true },
  crackTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PasswordAnalysis", passwordAnalysisSchema);
