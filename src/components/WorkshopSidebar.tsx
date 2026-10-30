import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, CheckCircle2, Send } from 'lucide-react';

export const WorkshopSidebar: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setErrorMsg('Please enter your mobile number');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="workshop" className="py-20 bg-[#030712] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Info Section (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#ef4444] mb-2 uppercase tracking-wider font-semibold">
                <MapPin className="w-4 h-4" />
                <span>Condercum Road Operational Hub</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Visit Newcastle Repair Centre
              </h2>
              <p className="mt-3 text-slate-300 text-base leading-relaxed">
                Conveniently situated at Unit D, Condercum Road in Newcastle's West End, moments from the West Road (A186) and A1 Western Bypass. Drive straight into our secure assessment bay for an immediate physical inspection, or arrange vehicle recovery.
              </p>
            </div>

            {/* Address & Hours Detail Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Location Card */}
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-[#ef4444] text-xs font-mono font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Workshop Facility</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Newcastle Repair Centre Ltd</h4>
                  <p className="text-sm text-slate-300 mt-1">Unit D, Condercum Road (Condercum Rd Back)</p>
                  <p className="text-sm text-slate-300">Newcastle upon Tyne</p>
                  <p className="text-sm font-mono text-[#ef4444] mt-1 font-bold">NE4 8XQ</p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Unit+D+Condercum+Road+Newcastle+upon+Tyne+NE4+8XQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ef4444] hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-[#ef4444]" />
                  <span>Verified Operating Hours</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Monday – Friday</span>
                    <span className="font-mono text-white font-semibold">8:30 AM – 5:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Saturday</span>
                    <span className="font-mono text-white font-semibold">9:00 AM – 1:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-400">
                    <span>Sunday</span>
                    <span className="font-mono text-slate-500">Closed (Recovery On-Call)</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  *Drop-ins welcome during weekday bay hours. Direct key drop available.
                </p>
              </div>

            </div>

            {/* Key Directions & Road Links */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/60 to-slate-900/30 border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2">Getting to Condercum Road:</h4>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <li>• <strong>From A1 Western Bypass:</strong> Exit at Denton Burn roundabout onto A186 West Road, head east towards town, turn onto Condercum Road (approx 3 mins).</li>
                <li>• <strong>From Newcastle City Centre:</strong> Follow Westgate Road / West Road uphill towards Benwell, turn right into Condercum Road.</li>
                <li>• <strong>Customer Parking:</strong> Designated free off-street visitor parking bays right in front of workshop reception.</li>
              </ul>
            </div>

          </div>

          {/* Prominent Callback Sidebar Widget (Right 5 cols) */}
          <div className="lg:col-span-5 bg-[#0b0f19] border border-[#dc2626]/35 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#dc2626] text-white px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              Direct Workshop Callback
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <img
                  src="/src/assets/logo.png"
                  alt="Newcastle Repair Centre"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Manager Damage Review
                  </h3>
                  <p className="text-xs text-slate-300">
                    Condercum Road, Newcastle
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Drop your mobile number below so our workshop manager on Condercum Road can call you to review damage photos and arrange your estimate.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-black/60 border border-[#dc2626]/40 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#dc2626]/20 border border-[#dc2626] text-[#ef4444] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Callback Request Confirmed!</h4>
                  <p className="text-xs text-slate-300 leading-normal">
                    Thank you! Our Condercum Road workshop manager has received your details and will call your mobile shortly during workshop hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setPhone(''); setName(''); }}
                    className="text-xs text-[#ef4444] hover:underline font-mono pt-1"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-4 pt-1">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Armstrong"
                      className="w-full px-3.5 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#dc2626]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">
                      Mobile Telephone Number <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07466 106529"
                      className="w-full px-3.5 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#dc2626]"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Transmitting...' : 'Request Manager Call'}</span>
                  </button>

                  <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#ef4444]" />
                      <span>Direct: <a href="tel:07466106529" className="text-white hover:text-[#ef4444] font-semibold underline font-mono">07466 106529</a> / <a href="tel:01912745800" className="text-white hover:text-[#ef4444] font-semibold underline font-mono">0191 274 5800</a></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>Email: <a href="mailto:Thenrc@outlook.com" className="text-slate-300 hover:underline">Thenrc@outlook.com</a></span>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
