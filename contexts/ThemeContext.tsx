import { ThemeType } from "@/types/Themetype";
import { useColorScheme } from "nativewind";
import React, { createContext } from "react";

export const ThemeContext = createContext<ThemeType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme = "light", setColorScheme } = useColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext value={{ theme: colorScheme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
};
