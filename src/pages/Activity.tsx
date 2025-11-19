import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, TrendingUp } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Activity = () => {
  const activities = [
    {
      id: 1,
      location: "Gedimino pr.",
      action: "Marked as free",
      points: 8,
      time: "5 minutes ago",
      status: "free",
    },
    {
      id: 2,
      location: "Žirmūnų g.",
      action: "Marked as taken",
      points: 6,
      time: "2 hours ago",
      status: "taken",
    },
    {
      id: 3,
      location: "Konstitucijos pr.",
      action: "Marked as free",
      points: 10,
      time: "5 hours ago",
      status: "free",
    },
    {
      id: 4,
      location: "Ozo g. Parking",
      action: "Marked as free",
      points: 7,
      time: "1 day ago",
      status: "free",
    },
    {
      id: 5,
      location: "Savanorių pr.",
      action: "Marked as taken",
      points: 9,
      time: "2 days ago",
      status: "taken",
    },
  ];

  const totalPoints = activities.reduce((sum, activity) => sum + activity.points, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <h1 className="text-2xl font-bold text-foreground">Activity</h1>
        <p className="text-sm text-muted-foreground">Your parking updates</p>
      </header>

      {/* Stats Card */}
      <div className="p-4">
        <Card className="p-4 border-border bg-gradient-to-br from-card to-secondary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Updates</p>
              <p className="text-3xl font-bold text-foreground">{activities.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Points Earned</p>
              <div className="flex items-center gap-1 text-primary">
                <TrendingUp className="w-4 h-4" />
                <p className="text-2xl font-bold">{totalPoints}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Activity List */}
      <div className="flex-1 px-4 pb-20 space-y-3">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="p-4 border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.status === "free"
                      ? "bg-success/10 text-success"
                      : "bg-taken/10 text-taken"
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground">
                    {activity.location}
                  </h3>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="flex-shrink-0">
                +{activity.points}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Activity;
