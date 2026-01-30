import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const [health, setHealth] = useState(50); // 0–100
  const [moodLogs, setMoodLogs] = useState([]);
  const { setTheme } = useTheme();
      const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchMood();
  }, []);

  const fetchMood = async () => {
    const res = await axios.get(`${API}/api/mood`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    setMoodLogs(res.data);
    applyMood(res.data.at(-1));
  };

  const applyMood = (log) => {
    if (!log) return;

    let delta = 0;

    if (log.mood === "Best") {
      delta = +10;
      setTheme("spring");
    } else if (log.mood === "Good") {
      delta = +6;
      setTheme("summer");
    } else if (log.mood === "Average") {
      delta = 0;
      setTheme("autumn");
    } else if (log.mood === "Low") {
      delta = -8;
      setTheme("winter");
    }

    setHealth((h) => Math.min(100, Math.max(20, h + delta)));
  };

  return (
    <>
      {/* Bootstrap CDN required in index.html */}

      <style>{`
        .dashboard {
          padding: 40px 0 80px;
        }

        .dash-title {
          font-weight: 700;
        }

        .dash-sub {
          font-size: 14px;
          color: #6b7280;
        }

        /* PLANT CARD */
        .plant-card {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 40px 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .plant-circle {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, #86efac, #22c55e);
          transition: transform 1.2s ease;
        }

        .plant-low {
          transform: scale(0.9) rotate(-4deg);
          filter: grayscale(40%);
        }

        .plant-mid {
          transform: scale(1);
        }

        .plant-high {
          transform: scale(1.1);
        }

        .plant-emoji {
          font-size: 72px;
        }

        /* TEXT */
        .growth-text {
          font-size: 14px;
          color: #6b7280;
          margin-top: 20px;
        }

        /* HISTORY CARD */
        .history-card {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .graph-bar {
          height: 10px;
          border-radius: 6px;
          margin-bottom: 12px;
          background: linear-gradient(90deg, #22c55e, #4ade80);
          animation: growBar 0.9s ease;
        }

        @keyframes growBar {
          from { width: 0; }
          to { width: 100%; }
        }

        @media (max-width: 768px) {
          .plant-circle {
            width: 180px;
            height: 180px;
          }
          .plant-emoji {
            font-size: 60px;
          }
        }
      `}</style>

      <div className="container dashboard animate__animated animate__fadeIn">
        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="dash-title">Your Inner Growth</h2>
          <p className="dash-sub">
            A calm visual reflection of your emotional journey
          </p>
        </div>

        <div className="row g-5 align-items-center">
          {/* LEFT : PLANT */}
          <div className="col-lg-6 text-center">
            <div className="plant-card">
              <div
                className={`plant-circle ${
                  health > 70
                    ? "plant-high"
                    : health > 40
                    ? "plant-mid"
                    : "plant-low"
                }`}
              >
                <div className="plant-emoji">🌱</div>
              </div>

              <p className="growth-text">
                {health > 70 &&
                  "You’re growing steadily. Keep honoring what’s working."}
                {health <= 70 &&
                  health > 40 &&
                  "You’re holding steady. Balance is being maintained."}
                {health <= 40 &&
                  "It’s okay to slow down. Growth also happens in rest."}
              </p>
            </div>
          </div>

          {/* RIGHT : HISTORY */}
          <div className="col-lg-6">
            <div className="history-card">
              <h5 className="mb-3">Recent emotional rhythm</h5>

              {moodLogs.length === 0 && (
                <p className="text-muted">No data yet</p>
              )}

              {moodLogs.slice(-7).map((log, i) => (
                <div key={i}>
                  <small className="text-muted">{log.mood}</small>
                  <div
                    className="graph-bar"
                    style={{
                      width:
                        log.mood === "Best"
                          ? "90%"
                          : log.mood === "Good"
                          ? "70%"
                          : log.mood === "Average"
                          ? "50%"
                          : "30%"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
