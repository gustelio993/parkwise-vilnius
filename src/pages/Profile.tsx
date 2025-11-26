import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Award, 
  MapPin, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight 
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Profile = () => {
  const user = {
    name: "Parking Hero",
    initials: "PH",
    totalUpdates: 42,
    totalPoints: 245,
    level: "Gold Member",
  };

  const menuItems = [
    { icon: Bell, label: "Notifications", badge: "3" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your account</p>
      </header>

      {/* Profile Card */}
      <div className="p-4">
        <Card className="p-6 border-border bg-gradient-to-br from-card to-primary/5">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 border-2 border-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-sm text-primary font-medium">{user.level}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-2xl font-bold text-foreground">{user.totalUpdates}</p>
              <p className="text-xs text-muted-foreground">Updates</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <Award className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-2xl font-bold text-foreground">{user.totalPoints}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-4 pb-20 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-between h-auto p-4 hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground font-medium">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Button>
        ))}

        <Button
          variant="ghost"
          className="w-full justify-start h-auto p-4 hover:bg-destructive/10 text-destructive mt-8"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Sign Out</span>
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
