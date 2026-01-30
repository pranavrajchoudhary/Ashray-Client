import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 const API = process.env.REACT_APP_API_URL;
  const submit = async () => {
    try {
      const res = await axios.post(
         `${API}/api/auth/register`,
        {
          name,
          email,
          password
        }
      );

      // ✅ AUTO LOGIN
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      alert("Registration successful. Let’s begin.");
      navigate("/quiz"); // ✅ ONBOARDING QUIZ
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <>
      {/* Bootstrap CDN required in index.html */}

      <style>{`
        .register-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .register-card {
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

        .register-title {
          font-weight: 700;
          text-align: center;
        }

        .register-sub {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 24px;
        }

        .register-btn {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .register-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
      `}</style>

      <div className="container register-wrapper">
        <div className="register-card">
          <h3 className="register-title">Create your Ashray account</h3>
          <p className="register-sub">
            A calm space begins with a simple step
          </p>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Full Name"
              onChange={e => setName(e.target.value)}
            />
          </div>

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
            className="btn btn-success w-100 register-btn"
            onClick={submit}
          >
            Register
          </button>

          <p className="text-center mt-3" style={{ fontSize: "13px" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#16a34a", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
