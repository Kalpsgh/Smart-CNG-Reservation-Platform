import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Fuel,
  CalendarDays,
  Users,
  IndianRupee,
  MapPinned,
  Clock3,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Smartphone,
  CreditCard,
} from "lucide-react";

// Animation Variants for staggered layout loading
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Home() {
  const [liveQueue, setLiveQueue] = useState(18);
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || user?.fullName || "Eco Driver";

  // Simulate a live shifting queue number for visual engagement
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveQueue((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next > 5 ? (next < 35 ? next : prev) : prev;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: "Today's Bookings",
      value: "148",
      color: "from-green-500/20 to-emerald-500/10 text-green-400 border-green-500/20",
      icon: CalendarDays,
    },
    {
      title: "Available Slots",
      value: "42",
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/20",
      icon: Fuel,
    },
    {
      title: "Active Users",
      value: "1,284",
      color: "from-green-600/20 to-green-500/10 text-green-300 border-green-500/10",
      icon: Users,
    },
    {
      title: "Today's Revenue",
      value: "₹18,500",
      color: "from-emerald-600/20 to-teal-600/10 text-emerald-300 border-emerald-500/10",
      icon: IndianRupee,
    },
  ];

  const features = [
    { title: "Smart Scheduling", desc: "Select direct timeslots to balance queue volume.", icon: Clock3 },
    { title: "Live Tracking", desc: "Check live pump load metrics instantly before driving.", icon: MapPinned },
    { title: "Digital Pass", desc: "Scan-and-pump QR clearance directly at the dispenser.", icon: Smartphone },
    { title: "Secure Checkout", desc: "Integrated payment gateways for immediate clearance.", icon: CreditCard },
  ];

  const bookings = [
    { id: 1, name: "Rahul Sharma", vehicle: "MH12AB1234", slot: "09:30 AM", status: "Confirmed" },
    { id: 2, name: "Priya Patil", vehicle: "MH14XY8899", slot: "10:15 AM", status: "Pending" },
    { id: 3, name: "Amit Joshi", vehicle: "MH43PQ1122", slot: "11:00 AM", status: "Completed" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white px-4 py-6 sm:p-8 selection:bg-green-500 selection:text-black">
      {/* Background Decorative Ambient Glow Fields */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[45vw] h-[45vw] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl mx-auto space-y-10"
      >
        {/* HERO BANNER SECTION */}
        <motion.section 
          variants={itemVariants}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden"
        >
          {/* Internal card geometric highlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-3xl rounded-full" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-4 max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold tracking-wide uppercase"
              >
                <Sparkles size={12} />
                Smart CNG Infrastructure
              </motion.div>
              
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Welcome Back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400 font-black">{userName}</span> 👋
              </h1>
              
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Skip standard refuelling bottlenecks. Track live queue structures, manage slot allocations, and handle dynamic payments through one unified framework.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-slate-950 font-bold hover:opacity-95 shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all flex items-center gap-2 group text-sm">
                  Book Priority Slot
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-slate-200 font-medium hover:bg-white/10 active:scale-[0.98] transition-all text-sm">
                  View Stations
                </button>
              </div>
            </div>

            {/* Floating Visual Accent */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="hidden lg:flex items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 relative"
            >
              <Fuel size={80} className="text-green-400/80 drop-shadow-[0_0_20px_rgba(74,222,128,0.3)]" />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-lg shadow-md">
                <ShieldCheck size={18} />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* METRICS & STATISTICS */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 sm:p-6 shadow-xl flex flex-col justify-between overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start gap-2">
                  <p className="text-slate-400 text-xs sm:text-sm font-medium tracking-wide">
                    {item.title}
                  </p>
                  <div className={`p-2 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {item.value}
                  </h2>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* LIVE TRACKING MODULES */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Live Queue Panel */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 flex flex-col justify-between shadow-xl relative"
          >
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                  Live Queue Metrics
                </h3>
                <Clock3 size={18} className="text-slate-400" />
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="overflow-hidden h-14 flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.h1 
                      key={liveQueue}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="text-5xl font-black tracking-tighter text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                    >
                      {liveQueue}
                    </motion.h1>
                  </AnimatePresence>
                </div>
                <p className="text-slate-300 text-sm font-medium">Vehicles currently in the active layout queue.</p>
                <p className="text-xs text-slate-500">Updates live every few seconds based on hardware telemetry.</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div 
                  animate={{ width: `${Math.min((liveQueue / 40) * 100, 100)}%` }}
                  transition={{ type: "spring", damping: 15 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" 
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                <span>Optimized</span>
                <span>Congested</span>
              </div>
            </div>
          </motion.div>

          {/* Map / Pump Overview */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-[-30%] right-[-10%] w-48 h-48 bg-emerald-500/5 blur-2xl rounded-full" />
            
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold tracking-wide flex items-center gap-2">
                  Nearest Active Station
                </h3>
                <MapPinned size={18} className="text-slate-400" />
              </div>

              <div className="mt-6 space-y-2">
                <h4 className="text-xl font-bold text-white tracking-wide">HP CNG Fuel Station</h4>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-md">
                  1.8 KM Away
                </div>
                <p className="text-slate-400 text-sm leading-relaxed pt-2">
                  Baner Road Infrastructure node. High-pressure dispensing active. Expected throughput time per vehicle: ~3.5 minutes.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full py-2.5 rounded-xl border border-green-500/30 bg-green-500/5 text-green-400 hover:bg-green-500 hover:text-slate-950 font-bold text-sm transition-all duration-300">
                Route via Navigation Map
              </button>
            </div>
          </motion.div>
        </div>

        {/* APP VALUE FEATURES OVERVIEW */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feat) => {
            const FeatIcon = feat.icon;
            return (
              <div key={feat.title} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
                <FeatIcon size={20} className="text-slate-500 group-hover:text-green-400 transition-colors" />
                <h4 className="mt-3 text-sm font-semibold text-slate-200">{feat.title}</h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </motion.div>

        {/* DATA ARCHIVE TABLE */}
        <motion.section 
          variants={itemVariants}
          className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold tracking-wide">Recent Allocation Queue</h3>
              <p className="text-xs text-slate-400 mt-0.5">Global system queue registration history.</p>
            </div>
            <button className="text-xs font-bold text-green-400 hover:underline tracking-wide self-start sm:self-auto">
              View Comprehensive History
            </button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-medium">
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Vehicle Identifier</th>
                  <th className="pb-3 font-semibold">Allocated Slot</th>
                  <th className="pb-3 font-semibold text-right">Status State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {bookings.map((item) => (
                  <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-medium text-slate-200">{item.name}</td>
                    <td className="py-3.5 font-mono text-xs text-slate-400 uppercase tracking-wider">{item.vehicle}</td>
                    <td className="py-3.5 text-slate-300">{item.slot}</td>
                    <td className="py-3.5 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
                        item.status === "Confirmed"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : item.status === "Pending"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}