import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      {/* Bootstrap CDN required in index.html */}

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: radial-gradient(circle at top, #ecfeff, #ffffff);
          overflow: hidden;
        }

        .hero-title {
          font-weight: 800;
          letter-spacing: -1px;
          animation: fadeSlide 0.9s ease forwards;
        }

        .hero-sub {
          font-size: 18px;
          color: #475569;
          max-width: 460px;
          animation: fadeSlide 1.2s ease forwards;
        }

        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-btn {
          border-radius: 999px;
          padding: 14px 32px;
          font-size: 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          animation: pulse 2.4s infinite;
        }

        .hero-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          70% { box-shadow: 0 0 0 16px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }

        .feature-card {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 20px;
          height: 100%;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          transition: transform 0.25s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
        }

        .floating-orb {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, #bbf7d0, transparent);
          top: -60px;
          right: -60px;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(18px); }
          100% { transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero-sub {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="hero container-fluid">
        <div className="floating-orb"></div>

        <div className="container">
          <div className="row align-items-center">
            {/* LEFT */}
            <div className="col-lg-6">
              <h1 className="display-4 hero-title">Ashray</h1>
              <p className="hero-sub mt-3">
                A digital shelter for the mind.  
                A space to pause, reflect, and feel heard — without judgement.
              </p>

              <button
                className="btn btn-success hero-btn mt-4"
                onClick={() => navigate("/register")}
              >
                Begin Your Journey
              </button>
            </div>

            {/* RIGHT */}
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="feature-card">
                    🤍 <b>Empathetic AI</b>
                    <p className="mt-2 mb-0 text-muted" style={{ fontSize: "14px" }}>
                      Listen without judgement or diagnosis
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="feature-card">
                    🌱 <b>Mood Tracking</b>
                    <p className="mt-2 mb-0 text-muted" style={{ fontSize: "14px" }}>
                      Visualize emotional rhythms over time
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="feature-card">
                    🎙 <b>Voice Release</b>
                    <p className="mt-2 mb-0 text-muted" style={{ fontSize: "14px" }}>
                      Speak what you never say out loud
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="feature-card">
                    📖 <b>Cultural Wisdom</b>
                    <p className="mt-2 mb-0 text-muted" style={{ fontSize: "14px" }}>
                      Grounding quotes and reflections
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
