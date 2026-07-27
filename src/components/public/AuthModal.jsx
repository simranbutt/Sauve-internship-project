import supabase from "../../config/supabaseClient";
import { useState } from "react";
import "./AuthModal.css";
import { IoCloseOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FiChrome, FiTwitter } from "react-icons/fi";
import { GoMail } from "react-icons/go";

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("signup"); // "signup" or "signin"
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      console.log("Signup successful:", data);
      // alert("Account created. Please check your email to verify your account before signing in.");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      console.log("Signin successful:", data);
    }
    setLoading(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.7)", }}
      onClick={onClose}    dir="ltr">
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content mcontent">
          {/* Header */}
          <div className="modal-header modal-head">
            <h4>
              {mode === "signup" ? "Create Account" : "Sign In"}
            </h4>

            <button type="button" onClick={onClose}>
              <IoCloseOutline />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">

            {/* Social Buttons */}
            <div className="social-login">
              <div className="google">
                <button className="google-btn">
                  <FiChrome /> Google
                </button>
              </div>

              <div className="facebook">
                <button className="fb-btn">
                  <FaFacebookF /> Facebook
                </button>
              </div>

              <button className="twitter-btn">
                <FiTwitter /> Twitter
              </button>
            </div>

            <div className="divider">
              <hr />
              <span style={{ color: 'hsl(215.4 16.3% 46.9%)', fontSize: '12px' }}>OR CONTINUE WITH</span>
              <hr />
            </div>

            <form onSubmit={handleSubmit}>

              {/* Show only for Sign Up */}
              {mode === "signup" && (
                <div className="form-group">
                  <label>Full name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="signin-btn" disabled={loading}>
                <GoMail />

                {loading ? mode === "signup" ? "Creating..." : "Signing In..." : mode === "signup" ? "Create Account" : "Sign In"}
              </button>
              {error && <p className="auth-error">{error}</p>}
            </form>

            {/* Bottom Link */}

            {mode === "signup" ? (
              <div className="signup-link">
                <span>Already have an account? </span>

                <button
                  type="button"
                  className="signup-a"
                  onClick={() => { setMode("signin"); setError(""); }}>
                  Sign In
                </button>
              </div>
            ) : (
              <div className="signup-link">
                <span>Don't have an account? </span>

                <button
                  type="button"
                  className="signup-a"
                  onClick={() => { setMode("signup"); setError(""); }}
                >
                  Sign Up
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}