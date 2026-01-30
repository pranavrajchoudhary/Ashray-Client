import { useState } from "react";
import axios from "axios";

const questions = [
  "I feel overwhelmed",
  "I sleep peacefully",
  "I suppress emotions",
  "I feel hopeful",
  "I feel anxious",
  "I feel supported",
  "I enjoy daily tasks",
  "I feel mentally tired"
];

export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const API = process.env.REACT_APP_API_URL;
  const submit = async () => {
    await axios.post(
       `${API}/api/quiz`,
      { answers },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    alert("Quiz submitted");
  };

  return (
    <>
      {/* Bootstrap CDN required in index.html */}

      <style>{`
        .quiz-wrapper {
          padding: 40px 0 80px;
        }

        .quiz-card {
          max-width: 720px;
          margin: auto;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
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

        .quiz-title {
          font-weight: 700;
          text-align: center;
        }

        .quiz-sub {
          font-size: 14px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 32px;
        }

        .question-card {
          background: #f8fafc;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .question-text {
          font-size: 15px;
          margin-bottom: 10px;
          color: #334155;
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

      <div className="container quiz-wrapper animate__animated animate__fadeIn">
        <div className="quiz-card">
          <h2 className="quiz-title">Niche Quiz</h2>
          <p className="quiz-sub">
            There are no right or wrong answers. Choose what feels closest to you.
          </p>

          {/* QUESTIONS */}
          {questions.map((q, i) => (
            <div key={i} className="question-card">
              <div className="question-text">
                {i + 1}. {q}
              </div>

              <select
                className="form-select"
                onChange={e =>
                  setAnswers(a => [...a, e.target.value])
                }
              >
                <option>{q}</option>
                <option>Never</option>
                <option>Sometimes</option>
                <option>Often</option>
              </select>
            </div>
          ))}

          <button
            className="btn btn-success w-100 mt-3 submit-btn"
            onClick={submit}
          >
            Submit Responses
          </button>
        </div>
      </div>
    </>
  );
}
