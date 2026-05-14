import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("useDarkMode must be used within a DarkModeProvider");

  return context;
};
