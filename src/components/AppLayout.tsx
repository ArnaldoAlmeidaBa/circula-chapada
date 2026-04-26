import { Link, useLocation } from "react-router-dom";
import { Home, List, PlusCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Logo } from "./Logo";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();

  const navItems = [
    { to: "/", label: "Início", icon: Home },
    { to: "/viagens", label: "Viagens", icon: List },
    { to: "/oferecer", label: "Oferecer", icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" aria-label="Início">
            <Logo size="sm" />
          </Link>
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted transition-smooth"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pb-28 pt-2">{children}</main>

      <nav className="fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-md border-t border-border safe-bottom">
        <div className="max-w-2xl mx-auto grid grid-cols-3">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to !== "/" && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center gap-1 py-3 transition-smooth ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.4 : 2} />
                <span className={`text-xs ${active ? "font-bold" : "font-medium"}`}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
