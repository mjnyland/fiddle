"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoids hydration mismatch on SSR
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleKeyDown = (e: React.KeyboardEvent, newTheme: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setTheme(newTheme);
    }
  };

  // Format the theme name with first letter capitalized
  const formatThemeName = (themeName: string | undefined) => {
    if (!themeName) return "System";
    return themeName.charAt(0).toUpperCase() + themeName.slice(1);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex items-center p-1">
        {/* System Theme Button */}
        <button
          className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors ${
            theme === "system"
              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          onClick={() => handleThemeChange("system")}
          onKeyDown={(e) => handleKeyDown(e, "system")}
          aria-label="Use system theme"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">System</span>
        </button>

        {/* Light Theme Button */}
        <button
          className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors ${
            theme === "light"
              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          onClick={() => handleThemeChange("light")}
          onKeyDown={(e) => handleKeyDown(e, "light")}
          aria-label="Use light theme"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">Light</span>
        </button>

        {/* Dark Theme Button */}
        <button
          className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors ${
            theme === "dark"
              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          onClick={() => handleThemeChange("dark")}
          onKeyDown={(e) => handleKeyDown(e, "dark")}
          aria-label="Use dark theme"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <span className="text-sm font-medium">Dark</span>
        </button>
      </div>

      {/* Display current theme */}
      <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900 text-xs text-center border-t border-gray-200 dark:border-gray-700">
        <span className="text-gray-500 dark:text-gray-400">
          Current:{" "}
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {formatThemeName(theme)}
          </span>
          {theme === "system" && resolvedTheme && (
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              ({resolvedTheme === "dark" ? "Dark" : "Light"})
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
