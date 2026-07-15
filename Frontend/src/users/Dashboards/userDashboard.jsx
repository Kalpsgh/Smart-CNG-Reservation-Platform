import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { CalendarCheck, Car, TrendingUp, Filter, Clock } from "lucide-react";

// Mock Data - In a real app, this comes from your API
const bookingData = {
  2026: [
    { name: "Jan", bookings: 12 }, { name: "Feb", bookings: 15 },
    { name: "Mar", bookings: 8 }, { name: "Apr", bookings: 20 },
    { name: "May", bookings: 14 }, { name: "Jun", bookings: 25 },
  ],
  2025: [
    { name: "Jan", bookings: 10 }, { name: "Feb", bookings: 12 },
    { name: "Mar", bookings: 5 }, { name: "Apr", bookings: 18 },
    { name: "May", bookings: 10 }, { name: "Jun", bookings: 20 },
    { name: "Dec", bookings: 79 }, { name: "Sep", bookings: 99 },
  ]
};
const getAllMonthsData = (data) => {
  const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return allMonths.map(month => ({
    name: month,
    bookings: data.find(item => item.name === month)?.bookings || 0
  }));
};
const recentBookings = [
  { id: 1, car: "Toyota Camry", date: "July 12, 2026", status: "Completed" },
  { id: 2, car: "Honda City", date: "July 10, 2026", status: "In Progress" },
];

export default function UserDashboard() {
  const [selectedYear, setSelectedYear] = useState("2026");
const currentData = getAllMonthsData(bookingData[selectedYear] || []);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage and analyze your travel activity</p>
          </div>
          
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-700 dark:text-white outline-none cursor-pointer"
          >
            <option value="2026">Year 2026</option>
            <option value="2025">Year 2025</option>
          </select>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Total Bookings", value: "40", icon: <CalendarCheck className="text-green-600" /> },
            { title: "Active Rides", value: "2", icon: <Car className="text-blue-600" /> },
            { title: "Avg. Monthly", value: "6.5", icon: <TrendingUp className="text-purple-600" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
                </div>
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
    Booking Frequency ({selectedYear})
  </h3>
  <div className="h-64 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={currentData}>
        {/* Adds subtle background lines for better readability */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        
        <XAxis 
          dataKey="name" 
          stroke="#94a3b8" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis 
          stroke="#94a3b8" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1e293b', 
            border: 'none', 
            borderRadius: '8px', 
            color: '#fff' 
          }} 
        />
        
        {/* The Line component: 'monotone' makes it smooth instead of jagged */}
        <Line 
          type="monotone" 
          dataKey="bookings" 
          stroke="#22c55e" 
          strokeWidth={3} 
          dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }} 
          activeDot={{ r: 6 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>
        {/* Recent Bookings Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{booking.car}</p>
                    <p className="text-xs text-slate-500">{booking.date}</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}