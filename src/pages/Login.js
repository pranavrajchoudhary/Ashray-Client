import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added
  const navigate = useNavigate(); // ✅ added

  const API = process.env.REACT_APP_API_URL;

  const submit = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true); // 🔒 lock button

      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      navigate("/dashboard"); // ✅ redirect after login
    } catch (err) {
      alert(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false); // 🔓 unlock button (safe)
    }
  };

  return (
    <>
      {/* Bootstrap CDN required in index.html */}

      <style>{`
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 32px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          animation: fadeUp 0.6s ease;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-title {
          font-weight: 700;
          text-align: center;
        }

        .login-sub {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 24px;
        }

        .login-btn {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>

      <div className="container login-wrapper">
        <div className="login-card">
          <h3 className="login-title">Welcome back</h3>
          <p className="login-sub">
            You’re safe here. Take your time.
          </p>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Email Address"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-success w-100 login-btn"
            onClick={submit}
            disabled={loading}   // 🔒 lock
          >
            {loading ? "Logging in…" : "Login"}
          </button>

          <p className="text-center mt-3" style={{ fontSize: "13px" }}>
            New to Ashray?{" "}
            <a href="/register" style={{ color: "#16a34a" }}>
              Create an account
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
