import { useState } from "react";
import { supabase } from "./supabase";
import "./Auth.css";

export default function Auth({ onClose, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { full_name: form.name } },
        });
        if (error) throw error;
        setError("✅ Account created! Please check your email to verify.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        onSuccess();
        onClose();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>
          ✕
        </button>

        <div className="auth-header">
          <div className="auth-logo">🥗</div>
          <h2>{mode === "login" ? "Welcome Back!" : "Create Account"}</h2>
          <p>
            {mode === "login"
              ? "Login to place your order"
              : "Sign up to get started"}
          </p>
        </div>

        <button className="google-btn" onClick={handleGoogle}>
          <img
            src="https://www.google.com/favicon.ico"
            width="18"
            height="18"
            alt="Google"
          />
          Continue with Google
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <div className="auth-form-group">
              <label>Full Name</label>
              <input
                required
                placeholder="John Doe"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
          )}
          <div className="auth-form-group">
            <label>Email Address</label>
            <input
              required
              type="email"
              placeholder="john@email.com"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
            />
          </div>
          <div className="auth-form-group">
            <label>Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
            />
          </div>
          {error && (
            <p
              className={`auth-error ${error.startsWith("✅") ? "success" : ""}`}
            >
              {error}
            </p>
          )}
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login →"
                : "Create Account →"}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
            }}
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
