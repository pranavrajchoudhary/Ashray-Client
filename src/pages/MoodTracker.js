import { useState } from "react";
import axios from "axios";

export default function MoodTracker() {
  const [data, setData] = useState({
    sleep: "",
    mood: "",
    digestion: ""
  });
  const API = process.env.REACT_APP_API_URL;
  const submit = async () => {
    await axios.post(
      `${API}/api/mood`,
      data,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    alert("Mood logged");
    window.location.href = "/dashboard";
  };

  return (
    <>
      {/* Bootstrap CDN required in index.html */}

      <style>{`
        .tracker-wrapper {
          padding: 40px 0 80px;
        }

        .tracker-card {
          max-width: 460px;
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

        .tracker-title {
          font-weight: 700;
          text-align: center;
        }

        .tracker-sub {
          font-size: 14px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 28px;
        }

        .tracker-label {
          font-size: 13px;
          color: #475569;
          margin-bottom: 6px;
        }

        .save-btn {
          border-radius: 14px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .save-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.12);
        }
      `}</style>

      <div className="container tracker-wrapper animate__animated animate__fadeIn">
        <div className="tracker-card">
          <h3 className="tracker-title">Daily Check-In</h3>
          <p className="tracker-sub">
            Take a moment to gently reflect on today
          </p>

          {/* SLEEP */}
          <div className="mb-3">
            <div className="tracker-label">Sleep</div>
            <select
              className="form-select"
              onChange={e =>
                setData({ ...data, sleep: e.target.value })
              }
            >
              <option>Sleep</option>
              <option>Good</option>
              <option>Average</option>
              <option>Poor</option>
            </select>
          </div>

          {/* MOOD */}
          <div className="mb-3">
            <div className="tracker-label">Mood</div>
            <select
              className="form-select"
              onChange={e =>
                setData({ ...data, mood: e.target.value })
              }
            >
              <option>Mood</option>
              <option>Best</option>
              <option>Good</option>
              <option>Average</option>
              <option>Low</option>
            </select>
          </div>

          {/* DIGESTION */}
          <div className="mb-4">
            <div className="tracker-label">Digestion</div>
            <select
              className="form-select"
              onChange={e =>
                setData({ ...data, digestion: e.target.value })
              }
            >
              <option>Digestion</option>
              <option>Comfortable</option>
              <option>Irregular</option>
              <option>Heavy</option>
            </select>
          </div>

          <button
            className="btn btn-success w-100 save-btn"
            onClick={submit}
          >
            Save Today’s Check-In
          </button>
        </div>
      </div>
    </>
  );
}
