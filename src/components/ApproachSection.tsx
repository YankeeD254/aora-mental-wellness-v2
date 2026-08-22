import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Search, Plus, Check, Shield, Compass } from 'lucide-react';
import { APPROACH_TABS } from '../data/wellnessData';
import { ApproachTab } from '../types';
import cogniwaveHeroImg from '../assets/images/cogniwave_hero_hand_1787336992035.jpg';
import { HERO_HAND_BASE64 } from '../data/heroImageBase64';

interface ApproachSectionProps {
  onOpenBooking: (focusArea?: string) => void;
  onSelectApproachDetail: (tab: ApproachTab) => void;
}

export const ApproachSection: React.FC<ApproachSectionProps> = ({
  onOpenBooking,
  onSelectApproachDetail,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(APPROACH_TABS[0].id);

  return (
    <section
      className="relative bg-[#0E0E0E] text-white pt-24 pb-28 rounded-t-[3.5rem] -mt-10 z-20 shadow-2xl overflow-hidden"
      id="approach"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />

      {/* Dribbble Top-Right Architectural Wireframe Box with Flora */}
      <div className="absolute top-0 right-0 w-80 sm:w-96 aspect-square pointer-events-none opacity-30 sm:opacity-50 overflow-hidden">
        <img
          src={HERO_HAND_BASE64 || cogniwaveHeroImg || 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80'}
          alt="Aora approach wireframe decoration"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-cover object-left-bottom transform translate-x-12 -translate-y-12"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0E0E0E]/60 to-[#0E0E0E]" />
      </div>

      {/* Architectural Stepped Contour Line matching Dribbble */}
      <div className="absolute inset-x-8 top-16 bottom-16 pointer-events-none hidden lg:block opacity-25">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 600" fill="none">
          <path
            d="M 50 180 L 600 180 C 625 180 635 170 635 150 L 635 80 C 635 55 650 40 675 40 L 950 40"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeDasharray="3 3"
            className="opacity-40"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header matching Dribbble */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="text-[11px] font-mono font-medium tracking-[0.25em] text-gray-400 uppercase">
            OUR APPROACH
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.12]">
            Art and science <br />
            of mental wellness
          </h2>
        </div>

        {/* Notched White Cards Grid matching Dribbble Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {APPROACH_TABS.map((tab, idx) => {
            const tabNumber = `/0${idx + 1}`;
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col group cursor-pointer"
                onClick={() => onSelectApproachDetail(tab)}
              >
                {/* Notched Top Tab Header Pill */}
                <div className="flex items-center">
                  <div className="bg-white/15 border border-white/20 text-white text-[11px] font-mono px-4 py-1.5 rounded-t-xl tracking-wider flex items-center gap-2 backdrop-blur-sm">
                    <span>{tabNumber}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
                  </div>
                </div>

                {/* Main White Card Container with rounded corners */}
                <div className="bg-white text-[#1A1A1A] rounded-2xl rounded-tl-none p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full border border-gray-100">
                  
                  <div className="space-y-4">
                    {/* Visual Photo */}
                    <div className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm bg-gray-100 relative">
                      <img
                        src={tab.image}
                        alt={tab.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                        {tab.badge}
                      </div>
                    </div>

                    {/* Title & Copy */}
                    <div className="space-y-2 pt-1">
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                        {tab.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {tab.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Row with More Details & Search Icon */}
                  <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectApproachDetail(tab);
                      }}
                      className="text-xs font-semibold text-gray-800 hover:text-purple-700 transition-colors py-1 cursor-pointer"
                    >
                      More details
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectApproachDetail(tab);
                      }}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#A78BFA] hover:text-white text-gray-600 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      aria-label="View details"
                    >
                      <Search className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>

        {/* Bottom Clinical Integration Strip */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-medium text-white">
              Ready to experience personalized psychiatric and somatic care?
            </h4>
            <p className="text-xs text-gray-400">
              Initial clinical matching consultations are available with zero waitlist today.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking('Approach Consultation')}
            className="bg-[#A78BFA] hover:bg-[#9270f2] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-purple-900/30 shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Begin Intake</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
