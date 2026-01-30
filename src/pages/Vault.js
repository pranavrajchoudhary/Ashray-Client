import { useEffect, useState } from "react";
import axios from "axios";

export default function Vault() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
const API = process.env.REACT_APP_API_URL;
  const load = async () => {
    const res = await axios.get(`${API}/api/vault`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setItems(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    await axios.post(`${API}/api/vault`, form, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setForm({ title: "", content: "" });
    load();
  };

  return (
    <>
      {/* Bootstrap CDN required in index.html */}

      <style>{`
        .vault-wrapper {
          padding: 40px 0 80px;
        }

        .vault-title {
          font-weight: 700;
        }

        .vault-sub {
          font-size: 14px;
          color: #6b7280;
          max-width: 640px;
          margin: auto;
        }

        .ml-banner {
          background: #f1f5f9;
          border-left: 4px solid #0d9488;
          padding: 16px;
          border-radius: 12px;
          font-size: 14px;
          color: #334155;
          margin-bottom: 30px;
        }

        .vault-card {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .vault-input {
          border-radius: 14px;
        }

        .save-btn {
          border-radius: 14px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .save-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.12);
        }

        .entry-card {
          background: #f8fafc;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 16px;
        }

        .entry-alert {
          font-size: 12px;
          background: #fff7ed;
          color: #9a3412;
          padding: 6px 10px;
          border-radius: 10px;
          display: inline-block;
          margin-top: 10px;
        }
      `}</style>

      <div className="container vault-wrapper animate__animated animate__fadeIn">
        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="vault-title">Personal Vault</h2>
          <p className="vault-sub">
            A private, secure space to store prescriptions, medical notes, and
            important personal health records — all in one place.
          </p>
        </div>

        {/* ML PROMPT */}
        <div className="ml-banner">
          ⚠️ <b>Note:</b> This Machine Learning model is currently under
          development and will be fully live by the final presentation.
          <br />
          <br />
          The Vault is designed to help users securely store prescriptions and
          health-related notes so that, in future, intelligent checks and alerts
          can assist users in understanding patterns, consistency, and potential
          concerns — <b>without replacing doctors.</b>
        </div>

        <div className="row g-5">
          {/* LEFT : ADD ENTRY */}
          <div className="col-lg-5">
            <div className="vault-card">
              <h5 className="mb-3">Add New Entry</h5>

              <div className="mb-3">
                <input
                  className="form-control vault-input"
                  placeholder="Title"
                  value={form.title}
                  onChange={e =>
                    setForm({ ...form, title: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <textarea
                  className="form-control vault-input"
                  rows="4"
                  placeholder="Notes / Prescription"
                  value={form.content}
                  onChange={e =>
                    setForm({ ...form, content: e.target.value })
                  }
                />
              </div>

              <button
                className="btn btn-success w-100 save-btn"
                onClick={submit}
              >
                Save to Vault
              </button>
            </div>
          </div>

          {/* RIGHT : ENTRIES */}
          <div className="col-lg-7">
            {items.length === 0 && (
              <p className="text-muted">No records saved yet</p>
            )}

            {items.map((i, idx) => (
              <div key={idx} className="entry-card">
                <h5 className="mb-1">{i.title}</h5>
                <p className="mb-2">{i.content}</p>

                {i.alert && (
                  <span className="entry-alert">
                    Alert: {i.alert}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
