import { createContext, useContext, useState } from "react";
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from "@mui/material";
import { ContextProvider } from "types/ContextProvider";
import { DarkTheme, LightTheme } from "lib/mui/Theme";
import { useLocalStorage } from "usehooks-ts";

type ThemeProviderProps = ContextProvider;

type ThemeContextProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [isDarkMode, setDarkMode] = useLocalStorage("dark-mode", prefersDarkMode);
  const [theme, setTheme] = useState(isDarkMode ? DarkTheme : LightTheme);

  const toggleTheme = () => {
    setDarkMode((prevValue: boolean) => !prevValue);
    setTheme((prevTheme) => (prevTheme.palette.mode === "dark" ? LightTheme : DarkTheme));
  };

  const value = {
    isDarkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { useThemeContext, ThemeProvider };
