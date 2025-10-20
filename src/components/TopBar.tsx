import {
  Sun,
  Moon,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Home,
  Sparkles,
  Menu,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface TopBarProps {
  onToggleSidebar?: () => void;
}

const TopBar = ({ onToggleSidebar }: TopBarProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<"EN" | "VI">("EN");

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Sparkles, label: "AI Style Transfer", path: "/ai-transfer" },
  ];

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }

    // Load language from localStorage
    const savedLanguage = localStorage.getItem("language") as
      | "EN"
      | "VI"
      | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleLanguage = () => {
    const newLanguage = language === "EN" ? "VI" : "EN";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const translations = {
    EN: {
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
    },
    VI: {
      profile: "Hồ sơ",
      settings: "Cài đặt",
      logout: "Đăng xuất",
    },
  };

  const t = translations[language];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-semibold text-gradient hidden sm:block">
            Hanoi Cultural Tours
          </h1>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
                    "hover:bg-primary/10 hover:text-primary",
                    isActive && "bg-primary text-primary-foreground shadow-sm",
                    !isActive && "text-foreground"
                  )
                }
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Navigation Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <NavLink
                    to={item.path}
                    className="flex items-center gap-2 w-full"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            className="hover:bg-primary/10"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="font-medium hover:bg-primary/10"
            aria-label="Switch language"
          >
            {language}
          </Button>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 hover:bg-primary/10">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User avatar" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    JD
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover">
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                {t.profile}
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                {t.settings}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 cursor-pointer text-destructive">
                <LogOut className="h-4 w-4" />
                {t.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
