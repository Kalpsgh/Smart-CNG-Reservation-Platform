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

// Mock Data
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Find CNG Stations</h1>
      </nav>

      <main className="max-w-2xl mx-auto p-4 sm:p-6">
        {/* Range Selector with custom styled track */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
              <SlidersHorizontal size={18} className="text-green-600" />
              <span>Search Range: {range} km</span>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
              {stations.length} Found
            </span>
          </div>
          <input 
            type="range" min="5" max="100" step="5" value={range}
            onChange={(e) => setRange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance cursor-pointer accent-green-300"

          />
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p>Locating stations...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {stations.map(station => (
              <div key={station.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-green-500 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl">
                    <Fuel size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{station.name}</h3>
                    <p className="text-xs text-slate-500">{station.address}</p>
                    <p className="text-xs font-bold text-green-600 mt-1">{station.distance.toFixed(1)} km away</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => alert(`Booking slot at ${station.name}`)}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-all">
                    <CalendarCheck size={14} /> Book Slot
                  </button>
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lon}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold py-2.5 rounded-lg transition-all">
                    <Navigation size={14} /> Get Route
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}