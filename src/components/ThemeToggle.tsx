import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border-2 border-primary/30 hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300 group animate-pulse hover:animate-none"
      style={{
        boxShadow: theme === "dark" 
          ? "0 0 20px rgba(0, 255, 136, 0.3), 0 0 40px rgba(0, 255, 136, 0.1), 0 0 60px rgba(0, 255, 136, 0.05)"
          : "0 0 20px rgba(0, 255, 136, 0.2), 0 0 40px rgba(0, 255, 136, 0.1)"
      }}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
      ) : (
        <Sun className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
      )}
      
      {/* Radiation rings */}
      <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: "2s" }}></div>
      <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.5s" }}></div>
    </Button>
  );
}