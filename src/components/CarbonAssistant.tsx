import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Image as ImageIcon, 
  Trash2, 
  Minimize2, 
  Maximize2
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: string;
  isEstimate?: boolean;
}

interface CarbonAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  initialPrompt?: string;
}

export const CarbonAssistant: React.FC<CarbonAssistantProps> = ({
  isOpen,
  onClose,
  onOpen,
  initialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Alright! Welcome to Newcastle Repair Centre on Condercum Road. I'm **CARBON**, your smart AI workshop assistant.

I can inspect damage photos and provide instant mockup estimates for:
- **Paint Fix**: ~£150 – £250
- **Dent Removal (PDR)**: ~£80 – £150
- **Bumper Scrape Repair**: ~£200

*(Note: All prices are prototype mockup estimates for this portfolio build).*

Feel free to describe the damage or click the photo icon below to upload a picture. Would you like to drop your mobile number here so our workshop manager can call you to look at a photo of the damage?`,
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [quickPhone, setQuickPhone] = useState('');
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      sendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('Please choose an image under 8MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : input).trim();
    const currentImg = selectedImage;

    if (!text && !currentImg) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      image: currentImg || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          image: currentImg || undefined,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "Thanks for your inquiry. Would you like to drop your mobile number here so our workshop manager can call you to look at a photo of the damage?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEstimate: data.isEstimate
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      const fallbackReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: `Thanks for providing those details! For this prototype mockup build, baseline estimates are:
- Paint Fix: ~£150 – £250
- Dent Removal: ~£80 – £150
- Bumper Scrape: ~£200

Would you like to drop your mobile number here so our workshop manager can call you to look at a photo of the damage?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone.trim()) return;

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: quickPhone, notes: 'Captured from CARBON chat widget' })
      });
      setPhoneSubmitted(true);
      const confMsg: ChatMessage = {
        id: `sys-${Date.now()}`,
        role: 'assistant',
        content: `Champion! I've logged your mobile number (${quickPhone}) directly with our workshop manager on Condercum Road. We'll ring you shortly to review your damage photos.`,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, confMsg]);
      setQuickPhone('');
    } catch (err) {
      setPhoneSubmitted(true);
    }
  };

  const quickPrompts = [
    'How much to fix a bumper scrape?',
    'Quote paintless dent removal on a door',
    'I have a key scratch across two panels',
    'What are your Condercum Road opening hours?'
  ];

  return (
    <>
      {/* Floating Launcher Badge (Bottom-Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={onOpen}
            className="group relative flex items-center gap-3 px-4 py-3 bg-[#0b0f19] hover:bg-[#111827] border border-[#dc2626]/60 hover:border-[#dc2626] text-white rounded-2xl shadow-[0_0_25px_rgba(220,38,38,0.35)] hover:shadow-[0_0_35px_rgba(220,38,38,0.6)] transition-all duration-300"
            aria-label="Open CARBON AI Workshop Assistant"
          >
            {/* Red indicator dot with pulse ring */}
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#ef4444] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#dc2626]" />
            </div>

            <img
              src="/src/assets/logo.png"
              alt="NRC Logo"
              className="w-6 h-6 object-contain"
            />

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono font-black text-[#ef4444] tracking-wider uppercase">
                  CARBON AI
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#ef4444]" />
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                Instant Damage Estimate
              </p>
            </div>
          </button>
        </div>
      )}

      {/* Interactive Chat Window Drawer */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col ${
            isExpanded
              ? 'inset-3 sm:inset-6 md:inset-12 bg-[#030712]/95'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#0b0f19]/95'
          } rounded-2xl border border-[#dc2626]/40 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-xl overflow-hidden`}
        >
          {/* Header */}
          <div className="p-4 bg-[#111827] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black border border-[#dc2626]/50 flex items-center justify-center p-1">
                <img
                  src="/src/assets/logo.png"
                  alt="NRC"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-white font-mono tracking-wider uppercase">
                    CARBON
                  </h3>
                  <span className="text-[10px] font-mono text-white font-bold bg-[#dc2626] px-1.5 py-0.2 rounded">
                    AI WORKSHOP ASSISTANT
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Newcastle Repair Centre · Condercum Road
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title={isExpanded ? 'Restore window size' : 'Expand window'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Close CARBON"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Prototype Disclosure Notice */}
          <div className="px-4 py-1.5 bg-[#0f172a] border-b border-white/5 flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
            <span>Prototype Estimates: Paint (~£150-£250) · Dent (~£80-£150) · Bumper (~£200)</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#dc2626] text-white font-medium rounded-tr-none shadow-md'
                      : 'bg-[#161f30] border border-white/10 text-slate-200 rounded-tl-none shadow-md'
                  }`}
                >
                  {/* Uploaded damage photo display */}
                  {msg.image && (
                    <div className="mb-2.5 rounded-lg overflow-hidden border border-black/20">
                      <img
                        src={msg.image}
                        alt="Uploaded damage photo"
                        className="max-h-48 w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Text prose */}
                  <div className="whitespace-pre-wrap space-y-2">
                    {msg.content}
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#ef4444] p-2 bg-[#161f30] border border-[#dc2626]/30 rounded-xl max-w-[70%]">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>CARBON inspecting damage & calculating quote...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel (Functional Pills) */}
          <div className="p-2 bg-[#090d16] border-t border-white/5 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendMessage(q)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-[#dc2626]/20 border border-white/10 hover:border-[#dc2626]/40 text-[11px] text-slate-300 hover:text-white whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Quick Mobile Callback Drawer within Chat */}
          {!phoneSubmitted && (
            <div className="px-3 py-2 bg-[#0d1320] border-t border-white/10">
              <form onSubmit={handleQuickLeadSubmit} className="flex items-center gap-2">
                <input
                  type="tel"
                  value={quickPhone}
                  onChange={(e) => setQuickPhone(e.target.value)}
                  placeholder="Drop mobile number for workshop callback..."
                  className="flex-1 px-3 py-1.5 bg-black/60 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#dc2626]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-[#dc2626] text-xs font-mono text-white rounded-lg border border-white/10 transition-colors whitespace-nowrap"
                >
                  Request Call
                </button>
              </form>
            </div>
          )}

          {/* Staged Photo Preview Bar */}
          {selectedImage && (
            <div className="p-2 bg-slate-900 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={selectedImage}
                  alt="Staged damage photo"
                  className="w-10 h-10 object-cover rounded border border-[#dc2626]"
                />
                <span className="text-[11px] text-slate-300 font-mono">
                  Damage photo attached for AI inspection
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1 text-slate-400 hover:text-rose-400"
                title="Remove photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-[#060912] border-t border-white/10 flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-slate-400 hover:text-[#ef4444] rounded-lg hover:bg-white/5 transition-colors"
              title="Upload vehicle damage photo"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask Carbon about scratches, dents, or bumper scrapes..."
              className="flex-1 px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#dc2626]"
            />

            <button
              type="button"
              disabled={loading || (!input.trim() && !selectedImage)}
              onClick={() => sendMessage()}
              className="p-2 rounded-xl bg-[#dc2626] text-white hover:bg-[#b91c1c] disabled:opacity-40 transition-all shadow-[0_0_12px_rgba(220,38,38,0.4)]"
              title="Send to CARBON"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
