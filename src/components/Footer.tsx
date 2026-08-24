import React, { useState } from 'react';
import { ArrowUp, CheckCircle2, AlertCircle, ArrowRight, Sparkles, PhoneCall, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../data/wellnessData';
import { submitNewsletterSubscription, EMAIL_REGEX } from '../services/emailService';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenBooking: (focus?: string) => void;
  onOpenStory: () => void;
  onSuccessToast: (title: string, message: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenStory,
  onSuccessToast,
}) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await submitNewsletterSubscription({ email: email.trim(), source: 'Website Footer Newsletter' });
      setIsSubmitting(false);
      setIsSubscribed(true);
      onSuccessToast(
        'Welcome to Aora Mental Wellness Journal',
        `We have registered ${email} and sent subscriber confirmation to Anyango Omondi (aoramentalwellness@gmail.com).`
      );
    } catch (err: any) {
      setIsSubmitting(false);
      setError(err?.message || 'Subscription failed. Please try again.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F0F0F] text-white pt-20 pb-12 relative overflow-hidden" id="about">
      {/* Glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-950/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Pre-Footer Newsletter & Lead Capture Banner */}
        <div className="bg-gradient-to-r from-[#1A1A1A] via-[#221C2B] to-[#1A1A1A] border border-white/10 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C4B5FD] text-[11px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Aora Journal</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                Receive weekly <span className="text-[#C4B5FD] font-semibold italic">somatic insights</span> & essays
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-lg leading-relaxed">
                Neurobiology breakdowns, guided 3-minute breathwork audios, and clinical essays by our doctoral staff. No spam, ever.
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs sm:text-sm animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Thanks for subscribing!</div>
                    <div className="text-emerald-200/80 text-xs">Check your inbox for your welcome reflection kit.</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full bg-white/10 border border-white/15 rounded-full px-5 py-3.5 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#A78BFA] transition-all pr-32 backdrop-blur-md"
                      id="newsletter-email-input"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute right-1.5 bg-[#A78BFA] hover:bg-[#9270f2] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-md disabled:opacity-50"
                      id="newsletter-submit-btn"
                    >
                      <span>{isSubmitting ? 'Joining...' : 'Subscribe'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {error && (
                    <div className="flex items-center gap-1.5 text-rose-400 text-xs pl-3">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10 text-xs">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="inline-flex items-center group cursor-pointer" aria-label="Aora Mental Wellness Home">
              <BrandLogo variant="light" size="lg" />
            </a>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Empowering mental and emotional vitality through compassionate, evidence-based psychological care and nervous system regulation. Led by consultant psychologist Anyango Omondi.
            </p>
            <div className="pt-2 space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-[#A78BFA] font-semibold">Location:</span>
                <span>5th Avenue, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#A78BFA] font-semibold">Psychologist:</span>
                <span>Anyango Omondi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#A78BFA] font-semibold">Phone:</span>
                <a href="tel:0735773392" className="hover:text-white underline decoration-[#A78BFA]">0735 773392</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#A78BFA] font-semibold">Email:</span>
                <a href="mailto:aoramentalwellness@gmail.com" className="hover:text-white underline decoration-[#A78BFA]">aoramentalwellness@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Sanctuary Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Sanctuary Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors">Individual Psychotherapy</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Couples & Marital Therapy</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">EMDR & Trauma Healing</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Anxiety & Burnout Recovery</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Online Video Telehealth</a></li>
            </ul>
          </div>

          {/* Clinical */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">About & Practice</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#approach" className="hover:text-white transition-colors">Clinical Approach</a></li>
              <li><a href="#therapists" className="hover:text-white transition-colors">Anyango Omondi Profile</a></li>
              <li><button type="button" onClick={onOpenStory} className="hover:text-white transition-colors text-left cursor-pointer">Practice Overview</button></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Patient Outcomes</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Fees</a></li>
            </ul>
          </div>

          {/* Care Actions */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Contact</h4>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              Ready to book with Anyango Omondi? Book online or contact our Nairobi office directly.
            </p>
            <div className="space-y-2.5 max-w-sm">
              <button
                type="button"
                onClick={() => onOpenBooking('General Intake')}
                className="w-full flex items-center justify-center px-4 py-3.5 bg-[#A78BFA] hover:bg-[#9270f2] text-white rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md text-center whitespace-nowrap"
              >
                Book Session Now
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-[#00a884] hover:bg-[#008f6f] text-white rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="whitespace-nowrap">Chat on WhatsApp (0735 773392)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Crisis Notice & Legal Bar */}
        <div className="pt-8 space-y-6">
          {/* Emergency Crisis Hotline Notice */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-300">
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-[#A78BFA] shrink-0" />
              <span>
                <strong className="text-white">Emergency & Crisis Support:</strong> If in acute distress, call Befrienders Kenya at <span className="text-[#C4B5FD] font-bold">+254 722 178 177</span>, emergency services at <span className="text-[#C4B5FD] font-bold">1199 / 999</span>, or for global support call <span className="text-[#C4B5FD] font-bold">988</span> (24/7, free & confidential).
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              © {new Date().getFullYear()} Aora Mental Wellness. 5th Avenue, Nairobi, Kenya. Anyango Omondi (Lead Psychologist).
            </div>

            <div className="flex items-center gap-6">
              <a href="mailto:aoramentalwellness@gmail.com" className="hover:text-gray-300 transition-colors">aoramentalwellness@gmail.com</a>
              <a href="tel:0735773392" className="hover:text-gray-300 transition-colors">0735 773392</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Confidentiality Notice</a>

              {/* Back to Top */}
              <button
                type="button"
                onClick={scrollToTop}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer ml-2"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
