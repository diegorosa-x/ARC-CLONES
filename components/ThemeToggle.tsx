"use client";

import React, { useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeToggle: React.FC = () => {
  // ✅ inicializa no client sem useEffect (evita warning)
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark"; // fallback
    const saved = localStorage.getItem("theme") as Theme | null;
    return saved ?? "dark";
  });

  // ✅ só sincroniza DOM + localStorage quando theme muda
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-slate-400 hover:text-brand-gold transition-colors p-2"
      aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      type="button"
    >
      <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"} text-lg`} />
    </button>
  );
};

export default ThemeToggle;
