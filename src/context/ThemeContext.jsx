import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || 'dark');

  useEffect(() => {
    const handleThemeChange = (matches) => {
      const selectedTheme = matches ? "dark" : "light";
      setTheme(selectedTheme);
      localStorage.setItem("theme", selectedTheme);
      console.log('selectedTheme', selectedTheme);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event) => {
      handleThemeChange(event.matches);
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  useEffect(() => {
    const applyTheme = (selected) => {
      document.documentElement.setAttribute("color-scheme", selected);
      localStorage.setItem("theme", selected);
    };
    applyTheme(theme);
  }, [theme]);
  console.log(theme);

  const changeTheme = (selected) => {
    if (selected === 'default') {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        // Theme set to dark.
        setTheme('dark');
      } else {
        // Theme set to light.
        setTheme('light');
      }
    } else {
      setTheme(selected);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
