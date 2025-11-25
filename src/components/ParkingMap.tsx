import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Lock } from "lucide-react";
import { toast } from "sonner";
import { useSubscription } from "@/hooks/useSubscription";

// IMPORTANT: Replace with your own Mapbox token from https://account.mapbox.com/access-tokens/
// Free tier: 50,000 monthly map loads at no cost
// This is a publishable key - safe to store in code
mapboxgl.accessToken = "pk.eyJ1IjoiZ3VzdGVsaW8iLCJhIjoiY21pZXBicjQwMDRuZjNnczlmaHJtOWVnZSJ9.qJzRrJczj9JPnuXLI2oDtA";

const ParkingMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const { isPremium } = useSubscription();

  // Parking spots with real Vilnius coordinates
  const parkingSpots = [
    { id: 1, name: "Gedimino pr.", status: "free", lng: 25.2798, lat: 54.6872, street: "Gedimino pr." },
    { id: 2, name: "Vilniaus g.", status: "taken", lng: 25.2876, lat: 54.6816, street: "Vilniaus g." },
    { id: 3, name: "Konstitucijos pr.", status: "free", lng: 25.2656, lat: 54.6896, street: "Konstitucijos pr." },
    { id: 4, name: "Žirmūnų g.", status: "taken", lng: 25.2995, lat: 54.7015, street: "Žirmūnų g." },
    { id: 5, name: "Ozo g. Parking", status: "free", lng: 25.2421, lat: 54.7241, street: "Ozo g." },
    { id: 6, name: "Savanorių pr.", status: "free", lng: 25.2598, lat: 54.6954, street: "Savanorių pr." },
    { id: 7, name: "Gedimino pr.", status: "taken", lng: 25.281, lat: 54.6865, street: "Gedimino pr." },
    { id: 8, name: "Vilniaus g.", status: "free", lng: 25.289, lat: 54.682, street: "Vilniaus g." },
  ];

  // Aggregate streets by availability for free users
  const streetAvailability = parkingSpots.reduce(
    (acc, spot) => {
      if (!acc[spot.street]) {
        acc[spot.street] = { free: 0, taken: 0, spots: [] };
      }
      acc[spot.street][spot.status === "free" ? "free" : "taken"]++;
      acc[spot.street].spots.push(spot);
      return acc;
    },
    {} as Record<string, { free: number; taken: number; spots: typeof parkingSpots }>,
  );

  const getStreetColor = (street: { free: number; taken: number }) => {
    const total = street.free + street.taken;
    const freePercentage = (street.free / total) * 100;
    if (freePercentage >= 60) return { color: "success", label: "Available" };
    if (freePercentage >= 30) return { color: "warning", label: "Limited" };
    return { color: "taken", label: "Full" };
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Check if token is set
    if (!mapboxgl.accessToken || mapboxgl.accessToken === "YOUR_MAPBOX_TOKEN_HERE") {
      toast.error("Mapbox token required", {
        description: "Get your free token at mapbox.com to enable the map",
      });
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [25.2797, 54.6872], // Vilnius city center
      zoom: 13,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right",
    );

    // Add markers based on subscription
    if (isPremium) {
      // Premium: Show individual parking spots
      parkingSpots.forEach((spot) => {
        const el = document.createElement("div");
        el.className = "parking-marker";
        el.innerHTML = `
          <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110 ${
            spot.status === "free" ? "bg-success" : "bg-taken"
          }">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <p class="font-semibold text-sm mb-1">${spot.name}</p>
            <span class="inline-block px-2 py-0.5 text-xs rounded ${
              spot.status === "free" ? "bg-success text-white" : "bg-taken text-white"
            }">
              ${spot.status === "free" ? "Available" : "Occupied"}
            </span>
          </div>
        `);

        new mapboxgl.Marker(el).setLngLat([spot.lng, spot.lat]).setPopup(popup).addTo(map.current!);
      });
    } else {
      // Free: Show general street availability
      Object.entries(streetAvailability).forEach(([streetName, data]) => {
        const centerSpot = data.spots[0]; // Use first spot as center
        const { color, label } = getStreetColor(data);

        const el = document.createElement("div");
        el.className = "street-marker";
        el.innerHTML = `
          <div class="w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110 bg-${color} border-4 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            </svg>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-3">
            <p class="font-semibold text-sm mb-2">${streetName}</p>
            <div class="flex items-center gap-2 mb-2">
              <span class="inline-block px-2 py-1 text-xs rounded bg-${color} text-white font-medium">
                ${label}
              </span>
            </div>
            <p class="text-xs text-muted-foreground">${data.free} free, ${data.taken} occupied</p>
            <div class="mt-2 pt-2 border-t flex items-center gap-1 text-xs text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Upgrade to see exact spots
            </div>
          </div>
        `);

        new mapboxgl.Marker(el).setLngLat([centerSpot.lng, centerSpot.lat]).setPopup(popup).addTo(map.current!);
      });
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  // GPS tracking
  useEffect(() => {
    if (!map.current) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);

        // Create or update user marker
        if (!userMarker.current) {
          const el = document.createElement("div");
          el.className = "user-location-marker";
          el.innerHTML = `
            <div class="relative">
              <div class="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              <div class="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-75"></div>
            </div>
          `;

          userMarker.current = new mapboxgl.Marker(el).setLngLat([longitude, latitude]).addTo(map.current!);
        } else {
          userMarker.current.setLngLat([longitude, latitude]);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Unable to access location", {
          description: "Please enable location services",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Center map on user location
  const centerOnUser = () => {
    if (userLocation && map.current) {
      map.current.flyTo({
        center: userLocation,
        zoom: 15,
        duration: 1500,
      });
    } else {
      toast.error("Location not available", {
        description: "Waiting for GPS signal...",
      });
    }
  };

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Token Required Message */}
      {(!mapboxgl.accessToken || mapboxgl.accessToken === "YOUR_MAPBOX_TOKEN_HERE") && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center p-6 max-w-md">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Map Setup Required</h3>
            <p className="text-muted-foreground mb-4">To display the interactive map, you need a free Mapbox token.</p>
            <div className="space-y-2 text-sm text-left bg-card p-4 rounded-lg border border-border">
              <p className="font-semibold">Quick setup:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Visit mapbox.com and sign up (free)</li>
                <li>Copy your access token</li>
                <li>Add it to src/components/ParkingMap.tsx line 12</li>
              </ol>
            </div>
            <Button
              onClick={() => window.open("https://account.mapbox.com/access-tokens/", "_blank")}
              className="mt-4 bg-primary hover:bg-accent"
            >
              Get Free Token
            </Button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg z-10">
        <div className="space-y-2 text-sm">
          {isPremium ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-card-foreground">Available Spot</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-taken"></div>
                <span className="text-card-foreground">Occupied Spot</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-card-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-card-foreground">Limited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-taken"></div>
                <span className="text-card-foreground">Full</span>
              </div>
            </>
          )}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-card-foreground">Your location</span>
          </div>
        </div>
      </div>

      {/* Premium Badge */}
      {!isPremium && (
        <div className="absolute top-4 right-4 bg-primary/95 backdrop-blur-sm border border-primary rounded-lg px-3 py-2 shadow-lg z-10">
          <div className="flex items-center gap-2 text-primary-foreground text-xs font-medium">
            <Lock className="w-3 h-3" />
            <span>Free Version</span>
          </div>
        </div>
      )}

      {/* Location button */}
      <Button
        onClick={centerOnUser}
        size="icon"
        className="absolute bottom-6 left-6 w-12 h-12 rounded-full shadow-lg bg-card hover:bg-card/90 border border-border z-10"
      >
        <Navigation className="w-5 h-5 text-primary" />
      </Button>

      <style>{`
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 0.5rem;
        }
        .mapboxgl-popup-close-button {
          font-size: 20px;
          padding: 4px 8px;
        }
      `}</style>
    </div>
  );
};

export default ParkingMap;
