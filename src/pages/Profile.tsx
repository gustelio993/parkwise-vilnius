import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Award, 
  MapPin, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Crown,
  Lock
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";

const Profile = () => {
  const { isPremium, toggleTier, tier } = useSubscription();
  
  const user = {
    name: "Parking Hero",
    initials: "PH",
    totalUpdates: 42,
    totalPoints: 245,
    level: isPremium ? "Premium Member" : "Free Member",
  };

  const handleToggleSubscription = () => {
    toggleTier();
    toast.success(
      isPremium ? "Switched to Free plan" : "Switched to Premium plan",
      {
        description: isPremium 
          ? "You'll now see general street availability" 
          : "You can now see exact parking spots!",
      }
    );
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
      <div className="p-4 space-y-4">
        <Card className="p-6 border-border bg-gradient-to-br from-card to-primary/5">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 border-2 border-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <div className="flex items-center gap-2">
                {isPremium && <Crown className="w-4 h-4 text-primary" />}
                <p className="text-sm text-primary font-medium">{user.level}</p>
              </div>
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

        {/* Subscription Card */}
        <Card className="p-6 border-border bg-gradient-to-br from-primary/10 to-card">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Subscription</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {isPremium ? "Premium Plan" : "Free Plan"}
              </p>
              {isPremium && (
                <p className="text-xs text-primary font-medium">$2.99/month</p>
              )}
            </div>
            <Badge variant={isPremium ? "default" : "secondary"} className="text-xs">
              {isPremium ? "Active" : "Free"}
            </Badge>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-2 text-sm">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isPremium ? 'bg-success' : 'bg-muted'}`}>
                {isPremium ? (
                  <span className="text-white text-xs">✓</span>
                ) : (
                  <Lock className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="text-foreground font-medium">Exact Parking Spots</p>
                <p className="text-xs text-muted-foreground">See individual spot availability</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-success flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <p className="text-foreground font-medium">General Availability</p>
                <p className="text-xs text-muted-foreground">Street-level availability view</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <span className="text-sm font-medium text-foreground">
              {isPremium ? "Premium Active" : "Enable Premium"}
            </span>
            <Switch checked={isPremium} onCheckedChange={handleToggleSubscription} />
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
