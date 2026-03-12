import { useState, useCallback } from "react";

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function PasswordGenerator({ onUsePassword }) {
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const toggleOption = (key) => {
    const updated = { ...options, [key]: !options[key] };
    // Ensure at least one option is always selected
    if (Object.values(updated).some(Boolean)) {
      setOptions(updated);
    }
  };

  const handleGenerate = useCallback(() => {
    let charset = "";
    if (options.uppercase) charset += CHARSETS.uppercase;
    if (options.lowercase) charset += CHARSETS.lowercase;
    if (options.numbers) charset += CHARSETS.numbers;
    if (options.symbols) charset += CHARSETS.symbols;

    if (!charset) return;

    // Ensure at least one of each enabled type
    let pw = "";
    if (options.uppercase) pw += CHARSETS.uppercase[Math.floor(Math.random() * CHARSETS.uppercase.length)];
    if (options.lowercase) pw += CHARSETS.lowercase[Math.floor(Math.random() * CHARSETS.lowercase.length)];
    if (options.numbers) pw += CHARSETS.numbers[Math.floor(Math.random() * CHARSETS.numbers.length)];
    if (options.symbols) pw += CHARSETS.symbols[Math.floor(Math.random() * CHARSETS.symbols.length)];

    for (let i = pw.length; i < length; i++) {
      pw += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle
    const shuffled = pw.split("").sort(() => Math.random() - 0.5).join("");
    setGenerated(shuffled);
    setCopied(false);
  }, [length, options]);

  const handleCopy = async () => {
    if (!generated) return;
    try {
      await navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = generated;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const optionLabels = {
    uppercase: "A-Z",
    lowercase: "a-z",
    numbers: "0-9",
    symbols: "!@#",
  };

  return (
    <div className="animate-slide-in rounded-2xl border border-cyber-border bg-cyber-card/90 p-5 backdrop-blur-md">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyber-text">
        <svg
          className="h-4 w-4 text-cyber-purple"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Password Generator
      </h3>

      {/* Length slider */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-cyber-muted">Length</span>
          <span className="rounded-md bg-cyber-accent/10 px-2 py-0.5 font-mono font-bold text-cyber-accent">
            {length}
          </span>
        </div>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full cursor-pointer accent-cyber-accent"
        />
        <div className="mt-1 flex justify-between text-[10px] text-cyber-muted/50">
          <span>8</span>
          <span>16</span>
          <span>24</span>
          <span>32</span>
        </div>
      </div>

      {/* Character type toggles */}
      <div className="mb-4 flex gap-2">
        {Object.entries(optionLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => toggleOption(key)}
            className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all ${
              options[key]
                ? "border-cyber-accent/40 bg-cyber-accent/10 text-cyber-accent"
                : "border-cyber-border bg-cyber-bg/50 text-cyber-muted hover:border-cyber-muted/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="w-full rounded-xl bg-gradient-to-r from-cyber-purple/20 to-cyber-blue/20 px-4 py-3 text-sm font-medium text-cyber-accent transition-all hover:from-cyber-purple/30 hover:to-cyber-blue/30 hover:shadow-lg hover:shadow-cyber-purple/10 active:scale-[0.98]"
      >
        🎲 Generate Strong Password
      </button>

      {generated && (
        <div className="mt-3 space-y-2 animate-slide-in">
          <div className="flex items-center gap-2 rounded-lg bg-cyber-bg/80 p-3 border border-cyber-border">
            <code className="flex-1 break-all font-mono text-sm text-cyber-accent">
              {generated}
            </code>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 rounded-lg border border-cyber-border px-3 py-2 text-xs font-medium text-cyber-muted transition-all hover:border-cyber-accent/30 hover:text-cyber-accent"
            >
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
            <button
              onClick={() => onUsePassword(generated)}
              className="flex-1 rounded-lg border border-cyber-accent/30 bg-cyber-accent/10 px-3 py-2 text-xs font-medium text-cyber-accent transition-all hover:bg-cyber-accent/20"
            >
              ⬆ Use this password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
