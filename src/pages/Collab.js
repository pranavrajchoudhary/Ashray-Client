import { useState } from "react";
import axios from "axios";

export default function Collab() {
  const [form, setForm] = useState({
    organization: "",
    email: "",
    requirement: "",
    mode: "Online"
  });

  const submit = async () => {
    await axios.post("http://localhost:5000/api/collab", form);
    alert("Request submitted");
  };

  return (
    <>
      {/* Bootstrap CDN required in index.html */}

      <style>{`
        .collab-wrapper {
          padding: 40px 0 80px;
        }

        .collab-card {
          max-width: 520px;
          margin: auto;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          animation: fadeUp 0.6s ease;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .collab-title {
          font-weight: 700;
          text-align: center;
        }

        .collab-sub {
          font-size: 14px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 24px;
        }

        .submit-btn {
          border-radius: 14px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.12);
        }
      `}</style>

      <div className="container collab-wrapper animate__animated animate__fadeIn">
        <div className="collab-card">
          <h3 className="collab-title">B2B Collaboration</h3>
          <p className="collab-sub">
            Partner with Ashray for meaningful mental wellbeing initiatives
          </p>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Organization Name"
              onChange={e =>
                setForm({ ...form, organization: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Contact Email"
              onChange={e =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Briefly describe your requirement"
              onChange={e =>
                setForm({ ...form, requirement: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <select
              className="form-select"
              onChange={e =>
                setForm({ ...form, mode: e.target.value })
              }
            >
              <option>Online</option>
              <option>Offline</option>
            </select>
          </div>

          <button
            className="btn btn-success w-100 submit-btn"
            onClick={submit}
          >
            Submit Collaboration Request
          </button>
        </div>
      </div>
    </>
  );
}
