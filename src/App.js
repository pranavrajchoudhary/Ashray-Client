import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import MoodTracker from "./pages/MoodTracker";
import Saathi from "./pages/Saathi";
import HerHaven from "./pages/HerHaven";
import Vault from "./pages/Vault";
import Crowdfund from "./pages/Crowdfund";
import Podcasts from "./pages/Podcasts";
import Collab from "./pages/Collab";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
    <Route path="/quiz" element={<Quiz />} />

        {token && (
          <>
        
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tracker" element={<MoodTracker />} />
            <Route path="/saathi" element={<Saathi />} />
            <Route path="/her-haven" element={<HerHaven />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/crowdfund" element={<Crowdfund />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/collab" element={<Collab />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
