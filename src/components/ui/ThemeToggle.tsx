"use client"

import { useTheme } from "../../hooks/useTheme"
import { useEffect, useState, useRef } from "react"
import { Sun, Moon, Monitor, Check } from "lucide-react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    if (!mounted) {
        return <div className="w-9 h-9 bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
    }

    
    const renderMainIcon = () => {
        switch (theme) {
            case "light":
                return <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500 transition-all" />
            case "dark":
                return <Moon className="h-[1.2rem] w-[1.2rem] text-violet-400 transition-all" />
            default:
                return <Monitor className="h-[1.2rem] w-[1.2rem] text-zinc-500 dark:text-zinc-400 transition-all" />
        }
    }

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-2xl border border-zinc-200 bg-white hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                aria-label="Toggle theme"
            >
                {renderMainIcon()}
            </button>

            {/* Dropdown Menu Overlay */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950 z-50 animate-in fade-in-50 duration-100">

                    <button
                        onClick={() => {
                            setTheme("light")
                            setIsOpen(false)
                        }}
                        className={`flex w-full items-center justify-between px-2.5 py-1.5 text-sm rounded-sm transition-colors cursor-pointer ${theme === "light"
                                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium"
                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4 text-amber-500" />
                            <span>Light</span>
                        </div>
                        {theme === "light" && <Check className="h-3.5 w-3.5" />}
                    </button>

                    <button
                        onClick={() => {
                            setTheme("dark")
                            setIsOpen(false)
                        }}
                        className={`flex w-full items-center justify-between px-2.5 py-1.5 text-sm rounded-sm transition-colors cursor-pointer ${theme === "dark"
                                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium"
                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4 text-violet-400" />
                            <span>Dark</span>
                        </div>
                        {theme === "dark" && <Check className="h-3.5 w-3.5" />}
                    </button>

                    <button
                        onClick={() => {
                            setTheme("system")
                            setIsOpen(false)
                        }}
                        className={`flex w-full items-center justify-between px-2.5 py-1.5 text-sm rounded-sm transition-colors cursor-pointer ${theme === "system"
                                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium"
                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-zinc-500" />
                            <span>System</span>
                        </div>
                        {theme === "system" && <Check className="h-3.5 w-3.5" />}
                    </button>

                </div>
            )}
        </div>
    )
}