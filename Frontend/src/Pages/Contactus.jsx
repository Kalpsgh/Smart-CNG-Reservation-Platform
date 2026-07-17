import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-6 lg:p-12 text-slate-900 dark:text-white">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-4xl font-black">Contact Support</h1>
          <p className="text-slate-500">Need help with your station or bookings? Reach out to our team.</p>
        </header>

        {/* Contact Links */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Mail, label: "Email", value: "kalpeshpatil@gmail.com" },
            { icon: Phone, label: "Helpline", value: "+91 9922738199" },
            { icon: MapPin, label: "Office", value: "Pune, Maharashtra" },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
              <item.icon className="text-green-500 mb-4" size={24} />
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">{item.label}</p>
              <p className="font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Direct Action Area */}
        <div className="p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] space-y-6">
          <h3 className="text-xl font-bold">Have a specific issue?</h3>
          <p className="text-slate-500 text-sm">Our support team typically responds within 24 hours. For urgent station matters, please use the helpline number.</p>
          
          <a 
            href="mailto:support@fastpass.com"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-all"
          >
            <Send size={18} />
            Draft an Email
          </a>
        </div>

      </div>
    </div>
  );
}