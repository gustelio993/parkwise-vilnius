import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Award, Users } from "lucide-react";

interface WelcomeProps {
  onComplete: () => void;
}

const Welcome = ({ onComplete }: WelcomeProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <MapPin className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">ParkWell</h1>
          <p className="text-muted-foreground text-lg">
            Find parking fast. Help others. Earn rewards.
          </p>
        </div>

        <div className="space-y-4">
          <Card className="p-6 border-border bg-card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">
                  Real-time Updates
                </h3>
                <p className="text-sm text-muted-foreground">
                  See live parking availability across Vilnius on an interactive map
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">
                  Community Powered
                </h3>
                <p className="text-sm text-muted-foreground">
                  Share parking status when you arrive or leave to help others
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">
                  Earn Rewards
                </h3>
                <p className="text-sm text-muted-foreground">
                  Collect points for updates and redeem at Caffeine & Circle K
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Button 
          onClick={onComplete}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-accent"
          size="lg"
        >
          Get Started
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to help make parking easier for everyone
        </p>
      </div>
    </div>
  );
};

export default Welcome;
