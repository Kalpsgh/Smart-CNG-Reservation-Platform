import { useState, useEffect } from "react";
import { 
  MapPin, 
  Navigation, 
  Loader2, 
  ArrowLeft, 
  Fuel, 
  SlidersHorizontal,
  CalendarCheck 
} from "lucide-react";
import MapView from "./Mapview";
import { List, Map } from "lucide-react";

const cngStations = [
  { id: 1, name: "City CNG Pump", lat: 18.5204, lon: 73.8567, address: "Shivaji Nagar" },
  { id: 2, name: "Highway Fuel Station", lat: 18.5500, lon: 73.9000, address: "Viman Nagar" },
  { id: 3, name: "Suburb CNG Point", lat: 18.6000, lon: 73.8000, address: "Pimpri Chinchwad" },
  { id: 4, name: "Global Fuel Hub", lat: 18.4500, lon: 73.9500, address: "Hadapsar" },
  { id: 5, name: "Green Energy Point", lat: 18.5800, lon: 73.7500, address: "Hinjewadi" },
];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export default function CngFinderPage() {
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [range, setRange] = useState(30);
const [viewMode, setViewMode] = useState("list");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      const filtered = cngStations
        .map(s => ({ 
          ...s, 
          distance: calculateDistance(userLocation.lat, userLocation.lon, s.lat, s.lon) 
        }))
        .filter(s => s.distance <= range)
        .sort((a, b) => a.distance - b.distance);
      setStations(filtered);
    }
  }, [range, userLocation]);

  return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors p-4 sm:p-8">
        {/* Header Section */}
        <header className="max-w-2xl mx-auto mb-8 text-left">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            Locate Your Nearest Station
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Find available CNG stations within your reach.
          </p>
        </header>

        <main className="max-w-2xl mx-auto">
          {/* Controls Area */}
          <div className="flex items-center justify-end gap-3 mb-6">
            {/* You can add your List/Map toggle buttons here */}
          </div>

          {/* Map/Results Container */}
          <div className="bg-white dark:bg-slate-900 p-2 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p className="font-medium">Locating stations...</p>
              </div>
            ) : (
              <div className="h-[500px] w-full rounded-2xl overflow-hidden">
                <MapView />
              </div>
            )}
          </div>
        </main>
      </div>
  );
}