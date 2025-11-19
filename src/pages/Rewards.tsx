import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Coffee, Fuel, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Rewards = () => {
  const userPoints = 245;

  const rewardPartners = [
    {
      name: "Caffeine",
      icon: Coffee,
      offers: [
        { name: "Free Coffee", points: 100 },
        { name: "Free Pastry", points: 150 },
        { name: "10% Off Order", points: 50 },
      ],
    },
    {
      name: "Circle K",
      icon: Fuel,
      offers: [
        { name: "5€ Fuel Voucher", points: 200 },
        { name: "Free Car Wash", points: 300 },
        { name: "Hot Dog Combo", points: 80 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <h1 className="text-2xl font-bold text-foreground">Rewards</h1>
        <p className="text-sm text-muted-foreground">Redeem your points</p>
      </header>

      {/* Points Balance */}
      <div className="p-4">
        <Card className="bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Your Points</p>
              <p className="text-4xl font-bold">{userPoints}</p>
            </div>
            <Award className="w-16 h-16 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Rewards List */}
      <div className="flex-1 px-4 pb-20 space-y-6">
        {rewardPartners.map((partner) => (
          <div key={partner.name}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <partner.icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">{partner.name}</h2>
            </div>
            
            <div className="space-y-3">
              {partner.offers.map((offer) => {
                const canAfford = userPoints >= offer.points;
                return (
                  <Card
                    key={offer.name}
                    className="p-4 border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-card-foreground mb-1">
                          {offer.name}
                        </h3>
                        <Badge variant={canAfford ? "default" : "secondary"}>
                          {offer.points} points
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        disabled={!canAfford}
                        className={canAfford ? "bg-accent hover:bg-accent/90" : ""}
                      >
                        {canAfford ? "Redeem" : "Locked"}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Rewards;
