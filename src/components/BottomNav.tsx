import { NavLink } from "@/components/NavLink";
import { MapPin, Gift, Clock, User } from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { to: "/", icon: MapPin, label: "Map" },
    { to: "/rewards", icon: Gift, label: "Rewards" },
    { to: "/activity", icon: Clock, label: "Activity" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="bg-card border-t border-border px-2 py-2 safe-area-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-muted-foreground transition-colors"
            activeClassName="text-primary bg-primary/10"
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
