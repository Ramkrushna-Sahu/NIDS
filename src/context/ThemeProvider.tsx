"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Theme = "light" | "dark" | "system";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("system");
    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if(newTheme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
            root.classList.add(systemTheme)
        }else{
            root.classList.add(newTheme);
        }
    }; 
    useEffect(()=>{
        const localTheme = localStorage.getItem("theme") as Theme | null
        const initialTheme = localTheme || "system"
        setThemeState(initialTheme)

        const root = window.document.documentElement
        root.classList.remove("light", "dark")

        if (initialTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        root.classList.add(systemTheme)
        } else {
        root.classList.add(initialTheme)
        }

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = () => {
            if (localStorage.getItem("theme") === "system" || !localStorage.getItem("theme")) {
                root.classList.remove("light", "dark")
                root.classList.add(mediaQuery.matches ? "dark" : "light")
            }
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])
    return(
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}