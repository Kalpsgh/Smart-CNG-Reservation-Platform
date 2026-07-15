import { useState ,useEffect } from "react";
import { AlertCircle, Calendar, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/api"; 

export default function ManagePump() {
  const [pumpStatus, setPumpStatus] = useState({
    isOpen: true,
    closureReason: "",
    closedFrom: "",
    closedTo: "",
  });
  const minDateTime = new Date().toISOString().slice(0, 16);
const handleSave = async () => {

  if (!pumpStatus.isOpen) {

    const now = new Date();
    const from = new Date(pumpStatus.closedFrom);
    const to = new Date(pumpStatus.closedTo);

    if (from < now) {
      return toast.error("Closed From cannot be in the past.");
    }

    if (to <= from) {
      return toast.error("'Closed To' must be after 'Closed From'.");
    }

    if (!pumpStatus.closureReason) {
      return toast.error("Please select a closure reason.");
    }
  }

  try {
    const token = localStorage.getItem("token");

    await api.put(
      "/pump/update-status",
      pumpStatus,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Pump updated successfully");

  } catch (err) {

    toast.error(
      err.response?.data?.message || "Failed to update pump"
    );

  }
};
useEffect(() => {
  fetchPumpStatus();
}, []);

const fetchPumpStatus = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await api.get("/pump/my-status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPumpStatus({
      isOpen: res.data.isOpen,
      closureReason: res.data.closureReason || "",
      closedFrom: res.data.closedFrom
        ? res.data.closedFrom.slice(0, 16)
        : "",
      closedTo: res.data.closedTo
        ? res.data.closedTo.slice(0, 16)
        : "",
    });

  } catch (err) {

    console.log(err);

  }
};
  return (
     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 ">
         <div className="max-w-xl mx-auto bg-white dark:bg-[#0b101d] p-8 rounded-3xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
      <h2 className="text-2xl font-black mb-6 dark:text-white">Pump Availability</h2>

      {/* Status Toggle - Custom Radio Buttons */}
      <div className="grid grid-cols-1 gap-4 mb-8">
       =

        <button
          onClick={() => setPumpStatus({ ...pumpStatus, isOpen: false })}
          className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all font-bold ${
            !pumpStatus.isOpen 
              ? "border-red-500 bg-red-500/10 text-red-600" 
              : "border-slate-200 dark:border-slate-800 text-slate-400"
          }`}
        >
          <XCircle size={20} /> Closed
        </button>
      </div>

      {/* Conditional Fields */}
      {!pumpStatus.isOpen && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div>
            <label className="text-sm font-bold text-slate-500 mb-2 block">Closure Reason</label>
            <div className="relative">
              <select
                value={pumpStatus.closureReason}
                onChange={(e) => setPumpStatus({ ...pumpStatus, closureReason: e.target.value })}
                className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 appearance-none outline-none focus:ring-2 focus:ring-red-500 dark:text-white font-medium"
              >
                <option value="">Select a reason...</option>
                <option>Maintenance</option>
                <option>Gas Unavailable</option>
                <option>Power Failure</option>
                <option>Holiday</option>
              </select>
              <ChevronDown className="absolute right-4 top-4 text-slate-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block">From</label>
              <input
                type="datetime-local"
                min={minDateTime}
                value={pumpStatus.closedFrom}
                onChange={(e) =>
                  setPumpStatus({
                    ...pumpStatus,
                    closedFrom: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block">To</label>
             <input
                type="datetime-local"
                min={pumpStatus.closedFrom || minDateTime}
                value={pumpStatus.closedTo}
                onChange={(e) =>
                  setPumpStatus({
                    ...pumpStatus,
                    closedTo: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleSave}
        className="w-full mt-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:opacity-90 transition-opacity"
      >
        Save Configuration
      </button>
    </div>
    </div>

  );
}