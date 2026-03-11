const { analyzePassword } = require("../utils/passwordStrength");
const PasswordAnalysis = require("../models/PasswordAnalysis");

/**
 * POST /api/password/check
 * Analyze a password, save to DB, return results.
 */
async function checkPassword(req, res) {
  try {
    const { password } = req.body;

    if (!password || typeof password !== "string") {
      return res.status(400).json({ error: "Password is required" });
    }

    const result = analyzePassword(password);

    // Save analysis to MongoDB
    const analysis = new PasswordAnalysis({
      password,
      score: result.score,
      strength: result.strength,
      crackTime: result.crackTime,
    });
    await analysis.save();

    return res.json({
      score: result.score,
      strength: result.strength,
      rules: result.rules,
      suggestions: result.suggestions,
      crackTime: result.crackTime,
    });
  } catch (error) {
    console.error("Error analyzing password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * GET /api/password/history
 * Retrieve recent password analysis history.
 */
async function getHistory(req, res) {
  try {
    const history = await PasswordAnalysis.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .select("-__v");
    return res.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { checkPassword, getHistory };
