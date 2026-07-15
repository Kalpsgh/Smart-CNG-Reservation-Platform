import { useState, useMemo, useEffect } from "react";
import { Search, Calendar, User, Hash, ChevronDown, ChevronUp } from "lucide-react";
import api from "../api/api"; 

export default function PumpBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [showAll, setShowAll] = useState(false); // New state for toggle

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/booking/owner-bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Sort by createdAt: newest first
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBookings(sorted);
    } catch (err) {
      console.error(err);
    }
  };
const filteredBookings = useMemo(() => {
  if (!Array.isArray(bookings)) return [];

  return bookings.filter((b) => {
    const searchLower = searchTerm.toLowerCase();

    const vehicleNumber = (b.vehicleNumber || "").toLowerCase();
    const qrToken = (b.qrToken || "").toLowerCase();

    const bookingDate = b.bookingDate
      ? new Date(b.bookingDate).toLocaleDateString("en-GB") // 16/07/2026
      : "";

    return (
      vehicleNumber.includes(searchLower) ||
      qrToken.includes(searchLower) ||
      bookingDate.includes(searchLower)
    );
  });
}, [bookings, searchTerm]);

  // Determine items to display based on search or toggle
  const displayCount = showAll ? filteredBookings.length : 3;
  const visibleBookings = filteredBookings.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8">
     {/* Search Bar */}
       <div className="max-w-xl mx-auto space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search by Vehicle No., QR Token or Date (DD/MM/YYYY)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-white"
        />
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {visibleBookings.length > 0 ? (
          <>
            {visibleBookings.map((b) => (
              <div key={b._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Hash className="text-slate-400" size={14} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{b.qrToken}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                    b.status === "Pending" ? "bg-slate-900 text-yellow-500" : "bg-green-100 text-green-700"
                  }`}>
                    {b.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg dark:text-white mb-2">{b.vehicleNumber || b.carNumber || "No Car Number"}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1"><Calendar size={14} /> {new Date(b.bookingDate).toLocaleDateString()}</div>
                  <div className="flex items-center gap-1"><User size={14} /> {b.slot}</div>
                </div>
              </div>
            ))}

            {/* Toggle Button */}
            {filteredBookings.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600 transition-colors"
              >
                {showAll ? <>Show Less <ChevronUp size={16} /></> : <>Show All ({filteredBookings.length}) <ChevronDown size={16} /></>}
              </button>
            )}
          </>
        ) : (
          <div className="text-center py-10 text-slate-500">No bookings found.</div>
        )}
      </div>
      </div>
    </div>
  );
}