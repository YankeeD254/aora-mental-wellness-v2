import React from 'react';
import { MapPin, Phone, Mail, UserCheck, MessageCircle, Calendar, AlertCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../data/wellnessData';

interface FooterProps {
  onOpenBooking: (focusArea?: string, therapistId?: string) => void;
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigate }) => {
  return (
    // ADDED id="about" AND scroll-mt-20 TO THE FOOTER TAG BELOW:
    <footer id="about" className="scroll-mt-20 bg-[#120E24] text-gray-300 pt-16 pb-12 relative overflow-hidden border-t border-purple-900/30">
      {/* Ambient background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-12">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Column 1: Brand & Custom Message */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-900/40">
                A
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-white block leading-none">
                  Aora<span className="text-purple-400">.</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-purple-300/80">
                  Mental Wellness
                </span>
              </div>
            </div>

            {/* Updated About Message */}
            <p className="text-sm text-gray-400 leading-relaxed">
              At <strong className="text-gray-200 font-medium">Aora Mental Wellness</strong>, we believe mental healthcare should be accessible, empowering, and deeply personalized. Led by consultant psychologist <strong className="text-gray-200 font-medium">Anyango Omondi</strong> in Nairobi, Kenya, our clinic provides a safe, non-judgmental sanctuary where you can process life’s challenges, build emotional resilience, and restore inner balance.
            </p>

            <div className="space-y-2.5 text-xs text-gray-300 pt-2 border-t border-purple-900/40">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong className="text-purple-300">Location:</strong> 5th Avenue, Nairobi, Kenya</span>
              </div>

              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span><strong className="text-purple-300">Psychologist:</strong> Anyango Omondi</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong className="text-purple-300">Phone:</strong> <a href="tel:0735773392" className="hover:text-emerald-400 transition-colors">0735 773392</a></span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span><strong className="text-purple-300">Email:</strong> <a href="mailto:aoramentalwellness@gmail.com" className="hover:text-purple-300 transition-colors">aoramentalwellness@gmail.com</a></span>
              </div>
            </div>
          </div>

          {/* Column 2: Sanctuary Services */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-purple-300/90 border-b border-purple-900/40 pb-2">
              Sanctuary Services
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button type="button" onClick={() => onOpenBooking('Individual Psychotherapy')} className="hover:text-white transition-colors cursor-pointer">
                  Individual Psychotherapy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenBooking('Couples & Marital Therapy')} className="hover:text-white transition-colors cursor-pointer">
                  Couples & Marital Therapy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenBooking('EMDR & Trauma Healing')} className="hover:text-white transition-colors cursor-pointer">
                  EMDR & Trauma Healing
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenBooking('Anxiety & Burnout Recovery')} className="hover:text-white transition-colors cursor-pointer">
                  Anxiety & Burnout Recovery
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenBooking('Online Video Telehealth')} className="hover:text-white transition-colors cursor-pointer">
                  Online Video Telehealth
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: About & Practice */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-purple-300/90 border-b border-purple-900/40 pb-2">
              About & Practice
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button type="button" onClick={() => onNavigate?.('about-us')} className="hover:text-white transition-colors cursor-pointer">
                  Clinical Approach
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate?.('about-us')} className="hover:text-white transition-colors cursor-pointer">
                  Anyango Omondi Profile
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate?.('about-us')} className="hover:text-white transition-colors cursor-pointer">
                  Practice Overview
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate?.('testimonials')} className="hover:text-white transition-colors cursor-pointer">
                  Patient Outcomes
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate?.('faqs')} className="hover:text-white transition-colors cursor-pointer">
                  FAQ & Fees
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact & CTAs */}
          <div className="lg:col-span-4 space-y-5 bg-purple-950/30 p-6 rounded-3xl border border-purple-800/20">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-purple-200">
                Direct Contact
              </h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                Ready to book with Anyango Omondi? Reserve online or contact our Nairobi office directly.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => onOpenBooking('General Intake', 'anyango-omondi')}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3.5 px-6 rounded-full text-xs shadow-lg shadow-purple-950/50 hover:shadow-purple-900/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-purple-100" />
                <span>Book Session Now</span>
              </button>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#059669] hover:bg-[#047857] text-white font-semibold py-3.5 px-6 rounded-full text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current text-emerald-100" />
                <span>Chat on WhatsApp (0735 773392)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Emergency & Crisis Support Banner */}
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/30 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs text-gray-300">
          <div className="p-2 rounded-xl bg-purple-900/50 text-purple-300 shrink-0">
            <AlertCircle className="w-4 h-4 text-purple-300" />
          </div>
          <p className="leading-normal">
            <strong className="text-white font-semibold">Emergency & Crisis Support:</strong> If in acute distress, call Befrienders Kenya at{' '}
            <a href="tel:+254722178177" className="text-purple-300 font-semibold underline underline-offset-2 hover:text-white">+254 722 178 177</a>, emergency services at{' '}
            <strong className="text-purple-200">1199 / 999</strong>, or for global support call <strong className="text-purple-200">988</strong> (24/7, free & confidential).
          </p>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <p>
            © 2026 Aora Mental Wellness. 5th Avenue, Nairobi, Kenya. Anyango Omondi (Lead Psychologist).
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <a href="mailto:aoramentalwellness@gmail.com" className="hover:text-purple-300 transition-colors">aoramentalwellness@gmail.com</a>
            <span>•</span>
            <a href="tel:0735773392" className="hover:text-emerald-400 transition-colors">0735 773392</a>
            <span>•</span>
            <span className="text-gray-500">Confidentiality Protected</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
