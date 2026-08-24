import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Clock, CheckCheck, ChevronRight } from 'lucide-react';
import { WHATSAPP_URL, THERAPISTS } from '../data/wellnessData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissedInitial, setHasDismissedInitial] = useState(false);

  const irene = THERAPISTS[0];

  const quickPrompts = [
    {
      label: '📅 Book a 1-on-1 Session',
      text: 'Hello Anyango Omondi, I would like to schedule a foundational individual therapy consultation.',
    },
    {
      label: '👥 Couples Therapy Inquiry',
      text: 'Hello Anyango Omondi, I would like to inquire about couples & relational therapy sessions.',
    },
    {
      label: '📍 Location & Fee Details',
      text: 'Hello Anyango Omondi, could you please share more details about your clinic location at 5th Avenue and available session slots?',
    },
  ];

  const getCustomWhatsAppUrl = (customText: string) => {
    return `https://wa.me/254735773392?text=${encodeURIComponent(customText)}`;
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Interactive WhatsApp Chat Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-[calc(100vw-2.5rem)] sm:w-84 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden pointer-events-auto text-gray-900"
            id="whatsapp-chat-card"
          >
            {/* WhatsApp Card Header */}
            <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 p-4 text-white relative">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-black/15 hover:bg-black/30 text-white/90 hover:text-white transition-colors cursor-pointer"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src={irene?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'}
                    alt="Psychologist Anyango Omondi"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
                    }}
                    className="w-12 h-12 rounded-2xl object-cover object-top ring-2 ring-white/40 shadow-sm"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-emerald-700" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-white tracking-tight truncate">
                      Anyango Omondi
                    </h3>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                  </div>
                  <p className="text-[11px] text-emerald-100 font-medium truncate">
                    Lead Clinical Psychologist
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-200/90 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>Replies in ~15 mins • Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body Bubble */}
            <div className="p-4 bg-[#F7F9F8] space-y-3">
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-xs border border-gray-100 text-xs text-gray-700 leading-relaxed relative">
                <p className="mb-1.5 font-medium text-gray-900">
                  Hello & welcome to Aora Mental Wellness! 🌱
                </p>
                <p className="text-gray-600">
                  How can we support your emotional and somatic journey today? Choose a prompt below or start a direct chat:
                </p>
                <span className="block text-[9px] text-gray-400 text-right mt-1 font-mono">
                  Just now
                </span>
              </div>

              {/* Quick Action Prompt Chips */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
                  Quick Inquiries
                </div>
                {quickPrompts.map((prompt, idx) => (
                  <a
                    key={idx}
                    href={getCustomWhatsAppUrl(prompt.text)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 bg-white hover:bg-emerald-50 border border-gray-200/80 hover:border-emerald-200 rounded-xl text-xs font-medium text-gray-800 hover:text-emerald-900 transition-all shadow-2xs group cursor-pointer"
                  >
                    <span className="truncate pr-2">{prompt.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Direct Send Input Bar */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open Direct WhatsApp Chat</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button with optional preview teaser */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {!isOpen && !hasDismissedInitial && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-gray-900 border border-emerald-100 shadow-xl rounded-full py-2 px-3.5 text-xs font-medium cursor-pointer hover:shadow-2xl transition-all"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span className="text-gray-800 font-semibold">Chat with Irene Omondi</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setHasDismissedInitial(true);
              }}
              className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
              aria-label="Dismiss teaser"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'bg-gray-900 text-white hover:bg-gray-800 rotate-90 shadow-gray-900/20'
              : 'bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-600/35 hover:scale-105 active:scale-95'
          }`}
          aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
          id="floating-whatsapp-btn"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              {/* Radar pulse ping */}
              <span className="absolute -inset-1 rounded-full bg-emerald-400/40 animate-ping pointer-events-none duration-1000" />
              <MessageCircle className="w-7 h-7 fill-white/20 stroke-white relative z-10" />
              {/* Online Indicator */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-xs">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              </span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
