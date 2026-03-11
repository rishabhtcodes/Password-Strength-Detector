const strengthConfig = {
  0: { label: "Very Weak", color: "bg-strength-very-weak", textColor: "text-strength-very-weak", glowColor: "rgba(239,68,68,0.3)", width: "5%" },
  1: { label: "Very Weak", color: "bg-strength-very-weak", textColor: "text-strength-very-weak", glowColor: "rgba(239,68,68,0.3)", width: "20%" },
  2: { label: "Weak",      color: "bg-strength-weak",      textColor: "text-strength-weak",      glowColor: "rgba(249,115,22,0.3)", width: "40%" },
  3: { label: "Medium",    color: "bg-strength-medium",     textColor: "text-strength-medium",    glowColor: "rgba(234,179,8,0.3)",  width: "60%" },
  4: { label: "Strong",    color: "bg-strength-strong",     textColor: "text-strength-strong",    glowColor: "rgba(132,204,22,0.3)", width: "80%" },
  5: { label: "Very Strong", color: "bg-strength-very-strong", textColor: "text-strength-very-strong", glowColor: "rgba(34,197,94,0.3)", width: "100%" },
};

export default function StrengthMeter({ score, password }) {
  const config = strengthConfig[score] || strengthConfig[0];
  const isEmpty = !password || password.length === 0;

  return (
    <div className="animate-slide-in">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-cyber-muted">
          Password Strength
        </span>
        {!isEmpty && (
          <span className={`text-sm font-bold ${config.textColor} transition-colors duration-300`}>
            {config.label}
          </span>
        )}
      </div>

      {/* Progress bar track */}
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-cyber-border transition-shadow duration-500"
        style={{ boxShadow: !isEmpty && score >= 1 ? `0 0 12px ${config.glowColor}` : "none" }}
      >
        <div
          className={`h-full rounded-full ${config.color} transition-all duration-500 ease-out ${
            score >= 4 ? "animate-pulse-glow" : ""
          }`}
          style={{ width: isEmpty ? "0%" : config.width }}
        />
      </div>

      {/* Segmented indicators — all same color based on current score */}
      <div className="mt-2 flex gap-1.5">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              !isEmpty && score >= level
                ? config.color
                : "bg-cyber-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
