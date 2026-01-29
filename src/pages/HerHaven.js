export default function HerHaven() {
  const doctors = [
    { name: "Dr. Ananya Rao", role: "Gynaecologist", exp: "10+ yrs" },
    { name: "Dr. Meera Shah", role: "Women Wellness", exp: "8+ yrs" }
  ];

  return (
    <>
      {/* Bootstrap CDN required in index.html */}

      <style>{`
        .haven-wrapper {
          padding: 40px 0 80px;
        }

        .haven-title {
          font-weight: 700;
        }

        .haven-sub {
          font-size: 14px;
          color: #6b7280;
          max-width: 520px;
          margin: auto;
        }

        .doctor-card {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 24px;
          height: 100%;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .doctor-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.12);
        }

        .doctor-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbcfe8, #f472b6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 12px;
        }

        .doctor-role {
          font-size: 14px;
          color: #6b7280;
        }

        .doctor-exp {
          font-size: 12px;
          color: #475569;
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: 20px;
          display: inline-block;
          margin-top: 6px;
        }

        .consult-btn {
          margin-top: 16px;
          width: 100%;
          border-radius: 12px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .consult-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.12);
        }
      `}</style>

      <div className="container haven-wrapper animate__animated animate__fadeIn">
        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="haven-title">Her Haven</h2>
          <p className="haven-sub">
            A women-first space for emotional safety, care, and trusted guidance.
          </p>
        </div>

        {/* DOCTOR CARDS */}
        <div className="row g-4 justify-content-center">
          {doctors.map((d, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div className="doctor-card">
                <div className="doctor-avatar">👩‍⚕️</div>

                <h5 className="mb-1">{d.name}</h5>
                <p className="doctor-role">{d.role}</p>
                <span className="doctor-exp">{d.exp} experience</span>

                <button className="btn btn-outline-primary consult-btn">
                  Video Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
