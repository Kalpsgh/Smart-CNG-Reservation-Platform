import { Zap, ShieldCheck, Clock, QrCode, Smartphone, Settings } from "lucide-react";

export default function Aboutus() {
  const features = [
    { title: "Real-time Scheduling", desc: "Book your fueling slot instantly and avoid long queues.", icon: Clock },
    { title: "Secure QR Verification", desc: "Contactless, fraud-proof digital passes for every booking.", icon: QrCode },
    { title: "Smart Management", desc: "Pump owners can toggle station status and capacity in real-time.", icon: Settings },
    { title: "Safety Assured", desc: "Verified station data and automated emergency shutdown protocols.", icon: ShieldCheck },
  ];

  return (
    <div className="py-20 px-6 bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-5xl mx-auto">
        
        {/* About Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black mb-6">Why BookMyCNG ?</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            We are revolutionizing the fueling experience by connecting vehicle owners with 
            station managers through a seamless, digitized, and highly efficient booking ecosystem.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { step: "01", title: "Book", desc: "Find your nearest station and secure a slot." },
            { step: "02", title: "Verify", desc: "Scan your unique QR code at the pump." },
            { step: "03", title: "Fuel", desc: "Enjoy a seamless, priority fueling experience." },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]">
              <span className="text-green-500 font-black text-2xl block mb-4">{item.step}</span>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]">
              <div className="p-3 h-fit rounded-xl bg-green-500/10 text-green-500">
                <feature.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold">{feature.title}</h4>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}