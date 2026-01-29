import { useEffect, useState } from "react";
import axios from "axios";

export default function Saathi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [started, setStarted] = useState(false);

  const introText =
    "Hello, I’m Ashray. I’m here to listen — not to judge or diagnose. You can speak freely.";

  useEffect(() => {
    setMessages([{ from: "ai", text: introText }]);
  }, []);

  const speak = (text) => {
    if (!audioEnabled) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    utter.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const startConversation = () => {
    window.speechSynthesis.resume();
    setAudioEnabled(true);
    setStarted(true);
    speak(introText);
  };

  const send = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    const res = await axios.post(
      "http://localhost:5000/api/ai/chat",
      { message: input },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );

    const aiMsg = { from: "ai", text: res.data.reply };
    setMessages((m) => [...m, aiMsg]);
    speak(res.data.reply);
  };

  return (
    <>
      {/* Bootstrap CDN required in index.html */}

      <style>{`
        .saathi-wrapper {
          padding: 30px 0 80px;
          max-width: 900px;
          margin: auto;
        }

        /* OVERLAY */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .popup {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px;
          max-width: 520px;
          text-align: center;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
          animation: fadeUp 0.6s ease;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .popup-note {
          font-size: 13px;
          color: #475569;
          background: #f1f5f9;
          padding: 10px;
          border-radius: 10px;
          margin-top: 16px;
        }

        /* AVATAR */
        .avatar {
          text-align: center;
          margin-bottom: 20px;
        }

        .avatar img {
          width: 90px;
          height: 90px;
        }

        .avatar h3 {
          margin-top: 10px;
          font-weight: 700;
        }

        .avatar .subtext {
          font-size: 13px;
          color: #6b7280;
        }

        /* CHAT */
        .chat-box {
          background: rgba(255,255,255,0.9);
          border-radius: 20px;
          padding: 20px;
          height: 360px;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .ai {
          background: #f1f5f9;
          padding: 12px 16px;
          border-radius: 14px;
          margin-bottom: 12px;
          max-width: 75%;
        }

        .user {
          background: #dcfce7;
          padding: 12px 16px;
          border-radius: 14px;
          margin-bottom: 12px;
          max-width: 75%;
          margin-left: auto;
        }

        /* INPUT */
        .input-box {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }

        .input-box input {
          flex: 1;
          border-radius: 14px;
        }

        .input-box button {
          border-radius: 14px;
        }

        /* STORIES */
        .stories {
          margin-top: 50px;
        }

        .story-card {
          background: #f8fafc;
          border-radius: 16px;
          padding: 16px;
          font-size: 14px;
        }
      `}</style>

      {/* POPUP */}
      {!started && (
        <div className="overlay">
          <div className="popup">
            <h2>Meet Saathi</h2>
            <p>
              Saathi is a calm AI companion designed to listen and reflect with
              you. It does not diagnose or judge. You can speak at your own pace.
            </p>

            <div className="popup-note">
              ⚠️ This is a <b>static demo AI</b> right now.  
              The real AI model (Gemini-based) will be integrated soon before
              the final presentation.
            </div>

            <button
              className="btn btn-success mt-4"
              onClick={startConversation}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      <div className="container saathi-wrapper animate__animated animate__fadeIn">
        {/* AVATAR */}
        <div className="avatar">
          <img
            src="saathi.jpeg"
            alt="Ashray AI Avatar"
          />
          <h3>Ashray</h3>
          <p className="subtext">Empathetic AI Companion (Non-medical)</p>
        </div>

        {/* CHAT */}
        <div className="chat-box mb-3">
          {messages.map((m, i) => (
            <div key={i} className={m.from}>
              {m.text}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="input-box">
          <input
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="You can speak freely here..."
            disabled={!started}
          />
          <button
            className="btn btn-primary"
            onClick={send}
            disabled={!started}
          >
            Send
          </button>
        </div>

        {/* STORIES */}
        <div className="stories">
          <h5 className="mb-3">Others felt this way too</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="story-card">
                🌧 “I felt heavy for weeks without knowing why.”
              </div>
            </div>
            <div className="col-md-6">
              <div className="story-card">
                🌱 “Talking without being judged helped me breathe again.”
              </div>
            </div>
            <div className="col-md-6">
              <div className="story-card">
                💭 “I just wanted someone to listen, not fix me.”
              </div>
            </div>
            <div className="col-md-6">
              <div className="story-card">
                🌤 “Slowly, naming my feelings made them lighter.”
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
