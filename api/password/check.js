const { connectDB } = require("../_lib/db");
const PasswordAnalysis = require("../_lib/PasswordAnalysis");
const { analyzePassword } = require("../_lib/passwordStrength");

module.exports = async (req, res) => {
  // CORS handling
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { password } = req.body;

    if (!password || typeof password !== "string") {
      return res.status(400).json({ error: "Password is required" });
    }

    await connectDB();

    const result = analyzePassword(password);

    // Save analysis to MongoDB
    const analysis = new PasswordAnalysis({
      passwordLength: password.length,
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
};
