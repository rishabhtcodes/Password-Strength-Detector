/**
 * Client-side password strength analysis for real-time feedback.
 */

export function analyzePassword(password) {
  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(rules).filter(Boolean).length;

  const strengthMap = {
    0: "Very Weak",
    1: "Very Weak",
    2: "Weak",
    3: "Medium",
    4: "Strong",
    5: "Very Strong",
  };
  const strength = strengthMap[score];

  const suggestions = [];
  if (!rules.length) suggestions.push("Use at least 8 characters");
  if (!rules.uppercase) suggestions.push("Add uppercase letters (A-Z)");
  if (!rules.lowercase) suggestions.push("Add lowercase letters (a-z)");
  if (!rules.number) suggestions.push("Add numbers (0-9)");
  if (!rules.symbol) suggestions.push("Add special characters (!@#$%^&*)");
  if (password.length < 12 && score >= 4)
    suggestions.push("Consider making it 12+ characters for extra security");

  const crackTime = estimateCrackTime(password);

  return { score, strength, rules, suggestions, crackTime };
}

function estimateCrackTime(password) {
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^A-Za-z0-9]/.test(password)) charsetSize += 32;

  if (charsetSize === 0 || password.length === 0) return "N/A";

  const guessesPerSecond = 1e10;
  const exponent =
    password.length * Math.log10(charsetSize) - Math.log10(guessesPerSecond);

  if (exponent < 0) return "Instant";
  const seconds = Math.pow(10, exponent);

  if (seconds < 1) return "Instant";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} minutes`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} hours`;
  const days = hours / 24;
  if (days < 365) return `${Math.round(days)} days`;
  const years = days / 365;
  if (years < 100) return `${Math.round(years)} years`;
  const centuries = years / 100;
  if (centuries < 1000) return `${Math.round(centuries)} centuries`;
  return "Millions of years";
}

/**
 * Generate a strong random password.
 */
export function generateStrongPassword(length = 16) {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const all = uppercase + lowercase + numbers + symbols;

  // Ensure at least one of each type
  let password = "";
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
