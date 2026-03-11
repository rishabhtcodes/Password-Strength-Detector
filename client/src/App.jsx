import { useState } from "react";
import Navbar from "./components/Navbar";
import PasswordInput from "./components/PasswordInput";
import StrengthMeter from "./components/StrengthMeter";
import PasswordChecklist from "./components/PasswordChecklist";
import PasswordSuggestions from "./components/PasswordSuggestions";
import PasswordGenerator from "./components/PasswordGenerator";
import { analyzePassword } from "./utils/passwordStrength";

export default function App() {
  const [password, setPassword] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [serverResult, setServerResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Real-time client-side analysis
  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value.length > 0) {
      setAnalysis(analyzePassword(value));
    } else {
      setAnalysis(null);
    }
    setServerResult(null);
    setError("");
  };

  // Send to backend for full analysis + DB storage
  const handleAnalyze = async () => {
    if (!password) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/password/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setServerResult(data);
    } catch (err) {
      setError("Failed to connect to server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const score = analysis?.score ?? 0;

  return (
    <div className="min-h-screen">
      {/* Background orbs */}
      <div className="bg-orbs">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" />
      </div>

      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-10">
        {/* Hero Title */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Password Strength{" "}
            <span className="gradient-text">Analyzer</span>
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-cyber-muted">
            Real-time analysis · Crack time estimation · Actionable feedback
          </p>
        </div>

        {/* Main Card */}
        <div className="stagger-children space-y-6 rounded-2xl border border-cyber-border bg-cyber-card/60 p-6 shadow-2xl backdrop-blur-sm glow-green">
          {/* Password Input */}
          <PasswordInput password={password} onChange={handlePasswordChange} />

          {/* Strength Meter */}
          <StrengthMeter score={score} password={password} />

          {/* Crack Time (client-side) */}
          {analysis && (
            <div className="animate-slide-in flex items-center justify-between rounded-xl border border-cyber-border bg-cyber-bg/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-cyber-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-cyber-muted">
                  Estimated crack time:
                </span>
              </div>
              <span className="font-mono text-sm font-bold text-white">
                {analysis.crackTime}
              </span>
            </div>
          )}

          {/* Checklist */}
          <PasswordChecklist rules={analysis?.rules} password={password} />

          {/* Suggestions */}
          <PasswordSuggestions
            suggestions={analysis?.suggestions ?? []}
            password={password}
          />

          {/* Analyze Button (sends to backend) */}
          {password.length > 0 && (
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-cyber-accent to-cyber-accent-dim py-3.5 text-sm font-bold text-cyber-bg transition-all hover:shadow-lg hover:shadow-cyber-accent/25 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "🔍 Analyze with Server"
              )}
            </button>
          )}

          {/* Server result */}
          {serverResult && (
            <div className="animate-slide-in rounded-xl border border-cyber-accent/20 bg-cyber-accent/5 p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyber-accent">
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
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                  />
                </svg>
                Server Analysis Result
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-cyber-bg/50 p-3">
                  <span className="text-cyber-muted">Score</span>
                  <p className="mt-1 font-mono text-lg font-bold text-white">
                    {serverResult.score}/5
                  </p>
                </div>
                <div className="rounded-lg bg-cyber-bg/50 p-3">
                  <span className="text-cyber-muted">Strength</span>
                  <p className="mt-1 font-mono text-lg font-bold text-white">
                    {serverResult.strength}
                  </p>
                </div>
                <div className="col-span-2 rounded-lg bg-cyber-bg/50 p-3">
                  <span className="text-cyber-muted">Crack Time</span>
                  <p className="mt-1 font-mono text-lg font-bold text-cyber-accent">
                    {serverResult.crackTime}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-cyber-muted">
                ✓ Result saved to database
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="animate-slide-in rounded-xl border border-strength-very-weak/20 bg-strength-very-weak/10 px-4 py-3 text-sm text-strength-very-weak">
              ⚠ {error}
            </div>
          )}
        </div>

        {/* Password Generator (below main card) */}
        <div className="mt-6">
          <PasswordGenerator onUsePassword={handlePasswordChange} />
        </div>

        {/* How it works */}
        <div className="mt-8">
          <h3 className="mb-4 text-center text-sm font-semibold text-white">
            How It Works
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                ),
                title: "1. Enter Password",
                desc: "Type or generate a password to test",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                ),
                title: "2. Get Analysis",
                desc: "Real-time strength scoring and crack time",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                ),
                title: "3. Stay Secure",
                desc: "Follow suggestions to improve security",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-cyber-border bg-cyber-card/40 p-4 text-center backdrop-blur-sm transition-all hover:border-cyber-accent/20 hover:bg-cyber-card/60"
              >
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-accent/10">
                  <svg
                    className="h-4 w-4 text-cyber-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    {step.icon}
                  </svg>
                </div>
                <h4 className="text-xs font-semibold text-white">{step.title}</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-cyber-muted">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pb-8">
          <div className="footer-separator mb-6" />
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-xs text-cyber-muted">
              ⚠ For educational purposes only. Never store raw passwords in production.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/rishabhtcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-muted transition-colors hover:text-cyber-accent"
                title="GitHub"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
            <p className="text-[11px] text-cyber-muted/60">
              Made with ❤️ by{" "}
              <a
                href="https://github.com/rishabhtcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-accent/60 transition-colors hover:text-cyber-accent"
              >
                rishabhtcodes
              </a>
              {" "}· Built with React · Vite · TailwindCSS · Express · MongoDB
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
