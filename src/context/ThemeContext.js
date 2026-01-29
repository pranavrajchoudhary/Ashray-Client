import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("autumn");
  const [mode, setMode] = useState("light"); // light | dark

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, setMode }}>
      <div className={`theme ${theme} ${mode}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
