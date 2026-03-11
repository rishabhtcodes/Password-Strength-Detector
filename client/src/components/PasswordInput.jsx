import { useState } from "react";

export default function PasswordInput({ password, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="animate-slide-in">
      <label
        htmlFor="password-input"
        className="mb-2 block text-sm font-medium text-cyber-muted"
      >
        Enter password to analyze
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-5 w-5 text-cyber-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
        <input
          id="password-input"
          type={visible ? "text" : "password"}
          value={password}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your password here..."
          autoComplete="off"
          className="w-full rounded-xl border border-cyber-border bg-cyber-card py-4 pl-12 pr-14 font-mono text-base text-white placeholder-cyber-muted/50 transition-all duration-300 focus:border-cyber-accent/50 focus:outline-none focus:ring-2 focus:ring-cyber-accent/20 glow-green"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-cyber-muted transition-colors hover:text-cyber-accent"
          title={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Character count */}
      <div className="mt-2 flex items-center justify-between text-xs text-cyber-muted">
        <span className="font-mono">
          {password.length > 0 ? `${password.length} characters` : ""}
        </span>
        {password.length > 0 && password.length < 8 && (
          <span className="text-strength-very-weak">
            Minimum 8 characters recommended
          </span>
        )}
      </div>
    </div>
  );
}
