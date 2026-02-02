import { useEffect, useState } from "react";

export  function useDarkModeToggle() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return { mode, toggleTheme };
}
