import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const ParkingMap = () => {
  const parkingSpots = [
    { id: 1, name: "Gedimino pr.", status: "free", x: "25%", y: "30%" },
    { id: 2, name: "Vilniaus g.", status: "taken", x: "60%", y: "45%" },
    { id: 3, name: "Konstitucijos pr.", status: "free", x: "40%", y: "60%" },
    { id: 4, name: "Žirmūnų g.", status: "taken", x: "70%", y: "25%" },
    { id: 5, name: "Ozo g. Parking", status: "free", x: "80%", y: "70%" },
    { id: 6, name: "Savanorių pr.", status: "free", x: "15%", y: "55%" },
  ];

  return (
    <div className="w-full h-full bg-muted relative overflow-hidden">
      {/* Simplified map background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Streets overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-0 right-0 h-1 bg-foreground/20"></div>
        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-foreground/30"></div>
        <div className="absolute top-2/3 left-0 right-0 h-1 bg-foreground/20"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-foreground/20"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-foreground/30"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-foreground/20"></div>
      </div>

      {/* Parking spots */}
      {parkingSpots.map((spot) => (
        <button
          key={spot.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 group"
          style={{ left: spot.x, top: spot.y }}
        >
          <div className="relative">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                spot.status === "free"
                  ? "bg-success text-success-foreground"
                  : "bg-taken text-taken-foreground"
              }`}
            >
              <MapPin className="w-6 h-6" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                <p className="text-sm font-medium text-card-foreground">{spot.name}</p>
                <Badge
                  variant={spot.status === "free" ? "default" : "destructive"}
                  className="mt-1 text-xs"
                >
                  {spot.status === "free" ? "Available" : "Occupied"}
                </Badge>
              </div>
            </div>
          </div>
        </button>
      ))}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-card-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-taken"></div>
            <span className="text-card-foreground">Occupied</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingMap;
