import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { theme, mode, setMode } = useTheme();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <>
      <style>{`
        /* NAV BASE */
        .ashray-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.75);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .ashray-nav.spring { background: rgba(236,253,245,0.75); }
        .ashray-nav.summer { background: rgba(254,252,232,0.75); }
        .ashray-nav.autumn { background: rgba(255,247,237,0.75); }
        .ashray-nav.winter { background: rgba(241,245,249,0.75); }

        .ashray-nav.dark {
          background: rgba(15,23,42,0.85);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        /* LOGO */
        .nav-logo a {
          font-weight: 800;
          font-size: 20px;
          text-decoration: none;
          color: inherit;
        }

        /* LINKS */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .nav-links a {
          text-decoration: none;
          font-size: 14px;
          color: inherit;
          opacity: 0.85;
        }

        .nav-links a.active {
          font-weight: 600;
          opacity: 1;
          border-bottom: 2px solid currentColor;
          padding-bottom: 4px;
        }

        .nav-btn {
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 13px;
          border: none;
          cursor: pointer;
        }

        .cta {
          background: #16a34a;
          color: white;
        }

        .logout {
          background: #ef4444;
          color: white;
        }

        .modeToggle {
          background: transparent;
          font-size: 18px;
          cursor: pointer;
        }

        /* BURGER */
        .burger {
          display: none;
          font-size: 22px;
          cursor: pointer;
        }

        /* MOBILE MENU */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 260px;
          background: white;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: -10px 0 30px rgba(0,0,0,0.15);
          transform: translateX(100%);
          transition: transform 0.3s ease;
          z-index: 200;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu.dark {
          background: #020617;
          color: #e5e7eb;
        }

        .mobile-menu a {
          text-decoration: none;
          color: inherit;
          font-size: 15px;
        }

        /* BOTTOM NAV */
        .bottomNav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: none;
          justify-content: space-around;
          padding: 10px 0;
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.8);
          border-top: 1px solid rgba(0,0,0,0.05);
        }

        .bottomNav.dark {
          background: rgba(15,23,42,0.9);
        }

        .bottomNav a {
          font-size: 20px;
          text-decoration: none;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .burger {
            display: block;
          }
          .bottomNav {
            display: flex;
          }
        }
      `}</style>

      {/* TOP NAV */}
      <nav className={`ashray-nav ${theme} ${mode}`}>
        <div className="nav-logo">
          <Link to="/">Ashray</Link>
        </div>

        <div className="nav-links">
          <NavLink to="/about">About</NavLink>

          {token ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/saathi">Saathi</NavLink>
              <NavLink to="/tracker">Tracker</NavLink>
              <NavLink to="/her-haven">Her Haven</NavLink>
              <NavLink to="/vault">Vault</NavLink>
              <NavLink to="/podcasts">Stories</NavLink>
              <NavLink to="/collab">Collaborate</NavLink>

              <button
                className="modeToggle"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
              >
                {mode === "light" ? "🌙" : "☀️"}
              </button>

              <button onClick={logout} className="nav-btn logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="nav-btn cta">
                Get Started
              </NavLink>
            </>
          )}
        </div>

        {/* BURGER */}
        <div className="burger" onClick={() => setOpen(true)}>
          ☰
        </div>
      </nav>

      {/* MOBILE SLIDE MENU */}
      <div className={`mobile-menu ${open ? "open" : ""} ${mode}`}>
        <div
          style={{ alignSelf: "flex-end", cursor: "pointer" }}
          onClick={() => setOpen(false)}
        >
          ✕
        </div>

        <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>

        {token ? (
          <>
            <NavLink to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink>
            <NavLink to="/saathi" onClick={() => setOpen(false)}>Saathi</NavLink>
            <NavLink to="/tracker" onClick={() => setOpen(false)}>Tracker</NavLink>
            <NavLink to="/vault" onClick={() => setOpen(false)}>Vault</NavLink>
            <NavLink to="/podcasts" onClick={() => setOpen(false)}>Stories</NavLink>
            <NavLink to="/collab" onClick={() => setOpen(false)}>Collaborate</NavLink>

            <button
              className="nav-btn"
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
              Toggle Theme
            </button>

            <button onClick={logout} className="nav-btn logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
            <NavLink to="/register" onClick={() => setOpen(false)}>Get Started</NavLink>
          </>
        )}
      </div>

      {/* BOTTOM NAV (MOBILE QUICK ACCESS) */}
      {token && (
        <div className={`bottomNav ${mode}`}>
          <NavLink to="/dashboard">🏠</NavLink>
          <NavLink to="/saathi">💬</NavLink>
          <NavLink to="/tracker">📊</NavLink>
          <NavLink to="/vault">🔐</NavLink>
        </div>
      )}
    </>
  );
}
