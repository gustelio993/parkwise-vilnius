import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Plus } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import ParkingMap from "@/components/ParkingMap";
import ReportDialog from "@/components/ReportDialog";

const Home = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" />
          <div>
            <h1 className="font-bold text-foreground">ParkVilnius</h1>
            <p className="text-xs text-muted-foreground">Vilnius City Center</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Navigation className="w-5 h-5" />
        </Button>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative">
        <ParkingMap />
        
        {/* Floating Action Button */}
        <Button
          onClick={() => setIsReportOpen(true)}
          className="absolute bottom-20 right-6 w-16 h-16 rounded-full shadow-lg bg-accent hover:bg-accent/90 hover:scale-105 transition-transform"
          size="icon"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </div>

      {/* Report Dialog */}
      <ReportDialog open={isReportOpen} onOpenChange={setIsReportOpen} />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
