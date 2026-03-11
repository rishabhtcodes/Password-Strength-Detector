const express = require("express");
const router = express.Router();
const { checkPassword, getHistory } = require("../controllers/passwordController");

router.post("/check", checkPassword);
router.get("/history", getHistory);

module.exports = router;
