export default function PasswordSuggestions({ suggestions, password }) {
  if (!password || password.length === 0 || suggestions.length === 0)
    return null;

  return (
    <div className="animate-slide-in rounded-xl border border-strength-weak/20 bg-strength-weak/5 p-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-strength-weak">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Suggestions to improve
      </h3>

      <ul className="space-y-1.5">
        {suggestions.map((suggestion, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 text-sm text-cyber-muted"
          >
            <span className="text-strength-weak">→</span>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
