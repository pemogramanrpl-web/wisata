import { useState, useEffect, type FormEvent } from 'react';
import { Check, Copy, MessageCircle, Send, X } from 'lucide-react';
import { CONCIERGE_PRESETS } from '../data/sanctuaryData';

interface WhatsAppConciergeDrawerProps {
  isOpen: boolean;
  prefilledMessage: string;
  onOpen: () => void;
  onClose: () => void;
}

interface ChatLine {
  id: string;
  sender: 'guest' | 'concierge';
  text: string;
  time: string;
}

export function WhatsAppConciergeDrawer({
  isOpen,
  prefilledMessage,
  onOpen,
  onClose,
}: WhatsAppConciergeDrawerProps) {
  const [messages, setMessages] = useState<ChatLine[]>([
    {
      id: 'welcome',
      sender: 'concierge',
      text: 'Sugeng rawuh at Lereng Asri! I am Dewi, your village concierge. Ask about morning trail conditions, plant-based hearth dinners, or your homestay dates.',
      time: 'Now',
    },
  ]);
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefilledMessage && isOpen) {
      setDraft(prefilledMessage);
    }
  }, [prefilledMessage, isOpen]);

  const appendReply = (userText: string, replyText: string) => {
    const stamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'guest', text: userText, time: stamp },
      { id: `c-${Date.now() + 1}`, sender: 'concierge', text: replyText, time: stamp },
    ]);
  };

  const handlePreset = (label: string, reply: string) => {
    appendReply(label, reply);
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    appendReply(
      trimmed,
      'Thank you! We have logged your note for Desa Lereng Asri Concierge. Our host team responds on WhatsApp (+62 811-2840-1350) between 06:00 and 21:00 WIB.',
    );
    setDraft('');
  };

  const handleCopySummary = async () => {
    const textToCopy = draft.trim() || prefilledMessage || 'Halo Lereng Asri Concierge, I would like to inquire about an upcoming eco-sanctuary stay.';
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      {/* Compact floating trigger respecting <=15% mobile sticky cap */}
      {!isOpen && (
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open Village Concierge WhatsApp"
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 h-12 px-5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold shadow-[0_16px_40px_-6px_rgba(17,45,25,0.28)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4D2B]"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline whitespace-nowrap">Village Concierge</span>
        </button>
      )}

      {/* Concierge Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Lereng Asri Village Concierge"
          className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-[400px] bg-white rounded-3xl border border-[#1E4D2B]/15 shadow-[0_16px_40px_-6px_rgba(17,45,25,0.22)] overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Drawer Header */}
          <div className="bg-[#1E4D2B] text-white px-5 py-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold">Lereng Asri Village Concierge</p>
              <p className="text-xs font-label-tech text-[#BBF0C4]">
                WhatsApp Host · +62 811-2840-1350
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close concierge drawer"
              className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-[#F3FAF4]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'guest' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === 'guest'
                      ? 'bg-[#1E4D2B] text-white'
                      : 'bg-white text-[#121C2C] border border-[#1E4D2B]/10'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[11px] font-label-tech text-[#414941] mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Inquiry Presets */}
          <div className="px-4 py-2.5 bg-white border-t border-[#1E4D2B]/10 flex flex-wrap gap-1.5">
            {CONCIERGE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePreset(preset.label, preset.reply)}
                className="px-3 py-1.5 rounded-full bg-[#F3FAF4] hover:bg-[#1E4D2B]/10 text-xs font-medium text-[#1E4D2B] transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Input & Copy Action */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-[#1E4D2B]/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a message to Dewi..."
              className="flex-1 min-w-0 h-11 px-3.5 rounded-xl border border-[#1E4D2B]/20 text-sm text-[#121C2C] focus:outline-none focus:border-[#2E7D32]"
            />
            <button
              type="button"
              onClick={handleCopySummary}
              title="Copy message for WhatsApp"
              aria-label="Copy message for WhatsApp"
              className="w-11 h-11 rounded-xl border border-[#1E4D2B]/20 text-[#1E4D2B] hover:bg-[#F3FAF4] flex items-center justify-center shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#2E7D32]" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              type="submit"
              aria-label="Send message"
              className="w-11 h-11 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
