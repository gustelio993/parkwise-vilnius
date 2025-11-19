import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Plus } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import ParkingMap from "@/components/ParkingMap";
import ReportDialog from "@/components/ReportDialog";
import { toast } from "sonner";

const Home = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // Check location permission on mount
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setHasLocationPermission(result.state === "granted");
        
        if (result.state === "prompt") {
          toast.info("Location access needed", {
            description: "Enable location to see nearby parking spots",
          });
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" />
          <div>
            <h1 className="font-bold text-foreground">ParkVilnius</h1>
            <p className="text-xs text-muted-foreground">Vilnius City Center</p>
          </div>
        </div>
        {hasLocationPermission === false && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              toast.info("Enable location services", {
                description: "Go to your browser settings to enable location access",
              });
            }}
          >
            <Navigation className="w-4 h-4 mr-1" />
            <span className="text-xs">Enable GPS</span>
          </Button>
        )}
      </header>

      {/* Map Container */}
      <div className="flex-1 relative">
        <ParkingMap />
        
        {/* Floating Action Button */}
        <Button
          onClick={() => setIsReportOpen(true)}
          className="absolute bottom-20 right-6 w-16 h-16 rounded-full shadow-lg bg-accent hover:bg-accent/90 hover:scale-105 transition-transform z-10"
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
