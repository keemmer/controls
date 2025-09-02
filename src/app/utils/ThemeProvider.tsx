'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes: Record<Theme, Record<string, string>> = {
  light: {
    "--color-primary": "#7254d4",
    "--color-sidebarBg": "#ffffff",
    "--color-sidebarText": "#6b7280",
    "--color-sidebarHover": "#f3f4f6",
  },
  dark: {
    "--color-primary": "#a78bfa",
    "--color-sidebarBg": "#1f2937",
    "--color-sidebarText": "#9ca3af",
    "--color-sidebarHover": "#374151",
  },
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    const themeColors = themes[theme];
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
