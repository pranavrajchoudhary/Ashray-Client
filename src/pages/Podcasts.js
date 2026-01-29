export default function Podcasts() {
  const pods = [
    "Healing after burnout",
    "A doctor’s perspective on anxiety",
    "Real stories of recovery"
  ];

  return (
    <>
      {/* Bootstrap CDN required in index.html */}

      <style>{`
        .pod-wrapper {
          padding: 40px 0 80px;
        }

        .pod-title {
          font-weight: 700;
        }

        .pod-sub {
          font-size: 14px;
          color: #6b7280;
          max-width: 560px;
          margin: auto;
        }

        .pod-card {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 24px;
          height: 100%;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .pod-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.12);
        }

        .pod-tag {
          font-size: 12px;
          background: #ecfeff;
          color: #0369a1;
          padding: 4px 10px;
          border-radius: 999px;
          display: inline-block;
          margin-bottom: 10px;
        }

        .listen-btn {
          border-radius: 14px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .listen-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.12);
        }

        .similar-card {
          background: #f8fafc;
          border-radius: 14px;
          padding: 16px;
          font-size: 14px;
        }
      `}</style>

      <div className="container pod-wrapper animate__animated animate__fadeIn">
        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="pod-title">Podcast Stories</h2>
          <p className="pod-sub">
            Real voices. Real journeys. Stories that remind you — you’re not alone.
          </p>
        </div>

        {/* MAIN PODCASTS */}
        <div className="row g-4 mb-5">
          {pods.map((p, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div className="pod-card">
                <span className="pod-tag">Real Story</span>
                <h5>{p}</h5>
                <p className="text-muted" style={{ fontSize: "14px" }}>
                  A short, honest narrative shared to inspire reflection and hope.
                </p>
                <button className="btn btn-outline-primary listen-btn w-100">
                  ▶ Listen
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SIMILAR STORIES (STATIC UI) */}
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h5 className="mb-3">You may also relate to</h5>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="similar-card">
                  🌱 Finding calm during uncertainty
                </div>
              </div>
              <div className="col-md-6">
                <div className="similar-card">
                  💬 Learning to ask for help
                </div>
              </div>
              <div className="col-md-6">
                <div className="similar-card">
                  🌤 Rebuilding routine after burnout
                </div>
              </div>
              <div className="col-md-6">
                <div className="similar-card">
                  🧘 Living with anxiety, one day at a time
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
