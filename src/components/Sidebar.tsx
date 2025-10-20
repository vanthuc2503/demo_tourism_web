import { Home, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Sparkles, label: "AI Style Transfer", path: "/ai-transfer" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 z-30",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <nav className="flex flex-col gap-2 p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-primary/10 hover:text-primary",
                isActive && "bg-primary text-primary-foreground shadow-sm",
                !isActive && "text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="font-medium text-sm">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
