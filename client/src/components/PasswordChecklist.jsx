const ruleLabels = {
  length: "Minimum 8 characters",
  uppercase: "At least one uppercase letter (A-Z)",
  lowercase: "At least one lowercase letter (a-z)",
  number: "At least one number (0-9)",
  symbol: "At least one special character (!@#$%)",
};

export default function PasswordChecklist({ rules, password }) {
  if (!password || password.length === 0) return null;

  return (
    <div className="animate-slide-in">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyber-text">
        <svg
          className="h-4 w-4 text-cyber-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        Password Rules
      </h3>

      <ul className="space-y-2">
        {Object.entries(ruleLabels).map(([key, label]) => {
          const passed = rules?.[key] ?? false;
          return (
            <li
              key={key}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300 ${
                passed
                  ? "bg-strength-very-strong/10 text-strength-very-strong"
                  : "bg-strength-very-weak/5 text-cyber-muted"
              }`}
            >
              {passed ? (
                <svg
                  className="h-4 w-4 shrink-0 text-strength-very-strong"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4 shrink-0 text-strength-very-weak"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              <span>{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
