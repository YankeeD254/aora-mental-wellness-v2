import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Sparkles, ShieldCheck, Star, Users, Volume2, VolumeX, CheckCircle, Waves, ChevronDown, Check } from 'lucide-react';
import { THERAPISTS } from '../data/wellnessData';
import { Therapist } from '../types';
import cogniwaveHeroImg from '../assets/images/cogniwave_hero_hand_1787336992035.jpg';
import { HERO_HAND_BASE64 } from '../data/heroImageBase64';
import { therapeuticSoundEngine, RESONANT_PRESETS, ResonantTonePreset } from '../services/therapeuticSoundEngine';

interface HeroSectionProps {
  onOpenBooking: (focusArea?: string, therapistId?: string) => void;
  onOpenStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenStory }) => {
  const [activeAvatarHover, setActiveAvatarHover] = useState<Therapist | null>(null);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<ResonantTonePreset>(RESONANT_PRESETS[0]);
  const [showToneMenu, setShowToneMenu] = useState(false);

  // Toggle ambient therapeutic calming sound with multi-layer Solfeggio + theta binaural synthesis
  const toggleAmbientSound = async () => {
    if (!isAmbientPlaying) {
      await therapeuticSoundEngine.start(selectedPreset);
      setIsAmbientPlaying(true);
    } else {
      await therapeuticSoundEngine.stop();
      setIsAmbientPlaying(false);
    }
  };

  const handleSelectPreset = (preset: ResonantTonePreset) => {
    setSelectedPreset(preset);
    if (isAmbientPlaying) {
      therapeuticSoundEngine.updateFrequencies(preset);
    }
    setShowToneMenu(false);
  };

  useEffect(() => {
    return () => {
      if (therapeuticSoundEngine.getIsPlaying()) {
        therapeuticSoundEngine.stop();
      }
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] pt-32 pb-24 overflow-hidden flex flex-col justify-center" id="hero-section">
      {/* Background Soft Gradients matching Dribbble screenshot */}
      <div className="absolute top-0 right-0 w-[55%] h-[90%] bg-gradient-to-bl from-amber-50/70 via-purple-50/40 to-transparent pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[45%] h-[75%] bg-gradient-to-tr from-purple-100/50 via-purple-50/20 to-transparent pointer-events-none -z-10" />

      {/* Dribbble Architectural Contour Framing Lines */}
      <div className="absolute inset-x-8 top-28 bottom-12 pointer-events-none hidden lg:block opacity-40">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 700" fill="none">
          <path
            d="M 800 0 L 1150 0 C 1175 0 1190 15 1190 40 L 1190 280 C 1190 305 1175 320 1150 320 L 750 320 C 730 320 720 330 720 350 L 720 660 C 720 685 705 700 680 700 L 50 700"
            stroke="#1A1A1A"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="opacity-20"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        
        {/* Main Grid Layout matching Dribbble */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & 3D Artwork */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Massive Display Headline with Ready to help pill badge */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3.5">
                <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-medium tracking-tight text-[#1A1A1A] leading-[1.08]">
                  Embark on your mental <br className="hidden sm:inline" />
                  journey with professionals
                </h1>
                
                {/* Dribbble "• Ready to help" Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] shadow-xs cursor-pointer hover:bg-indigo-50 transition-colors shrink-0"
                  onClick={() => onOpenBooking('General Intake')}
                  id="hero-ready-badge"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F46E5] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4F46E5]"></span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#4338CA] tracking-wide">
                    Ready to help
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Surreal 3D Metallic Hand with Blooming Flora inside Wireframe Cube */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-xl aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/10 group mt-2"
            >
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="w-full h-full relative"
              >
                <img
                  src={HERO_HAND_BASE64 || cogniwaveHeroImg || 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80'}
                  alt="Aora 3D chrome hand with organic purple flora inside geometric prism"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating therapeutic resonant tone controller */}
                <div className="absolute bottom-4 right-4 z-20">
                  <div className="relative">
                    <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1.5 rounded-full text-purple-950 shadow-lg border border-purple-100 transition-all">
                      <button
                        type="button"
                        onClick={toggleAmbientSound}
                        className={`p-2 rounded-full cursor-pointer transition-all flex items-center gap-1.5 text-xs font-semibold ${
                          isAmbientPlaying
                            ? 'bg-purple-900 text-white shadow-sm'
                            : 'bg-purple-50 hover:bg-purple-100 text-purple-900'
                        }`}
                        title={isAmbientPlaying ? 'Pause therapeutic resonance' : 'Play therapeutic resonance'}
                      >
                        {isAmbientPlaying ? (
                          <>
                            <Waves className="w-4 h-4 text-purple-300 animate-pulse" />
                            <span className="text-[11px] font-medium tracking-wide">
                              {selectedPreset.frequency}Hz Active
                            </span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4 text-purple-800" />
                            <span className="text-[11px] font-medium tracking-wide">Resonant Tone</span>
                          </>
                        )}
                      </button>

                      {/* Dropdown toggle for Solfeggio presets */}
                      <button
                        type="button"
                        onClick={() => setShowToneMenu(!showToneMenu)}
                        className="p-1.5 text-purple-800 hover:text-purple-950 rounded-full hover:bg-purple-50 transition-colors cursor-pointer"
                        title="Choose therapeutic Solfeggio & Theta frequency"
                      >
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showToneMenu ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Popover Tone Selector Menu */}
                    <AnimatePresence>
                      {showToneMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="absolute bottom-full right-0 mb-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-purple-100/80 z-30 text-left space-y-1.5"
                        >
                          <div className="px-2 py-1 flex items-center justify-between border-b border-purple-50 pb-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900">Acoustic Resonance</span>
                            <span className="text-[9px] bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-full">Solfeggio + Theta</span>
                          </div>

                          {RESONANT_PRESETS.map((preset) => {
                            const isSelected = selectedPreset.id === preset.id;
                            return (
                              <button
                                key={preset.id}
                                type="button"
                                onClick={() => handleSelectPreset(preset)}
                                className={`w-full text-left p-2 rounded-xl transition-all flex items-start justify-between group cursor-pointer ${
                                  isSelected
                                    ? 'bg-purple-900 text-white'
                                    : 'hover:bg-purple-50/80 text-gray-800'
                                }`}
                              >
                                <div className="space-y-0.5 pr-2">
                                  <div className="flex items-center gap-1.5">
                                    <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-purple-950'}`}>
                                      {preset.name}
                                    </span>
                                    <span
                                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-medium ${
                                        isSelected ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-purple-800'
                                      }`}
                                    >
                                      {preset.tag}
                                    </span>
                                  </div>
                                  <p className={`text-[10px] leading-tight line-clamp-2 ${isSelected ? 'text-purple-200' : 'text-gray-500'}`}>
                                    {preset.description}
                                  </p>
                                </div>
                                {isSelected && <Check className="w-4 h-4 text-purple-200 shrink-0 mt-0.5" />}
                              </button>
                            );
                          })}

                          <div className="pt-1 px-1 border-t border-purple-50 text-[9px] text-gray-400 leading-tight">
                            Synthesizes organic warm pink noise, 4-7Hz theta binaural pulsation & singing bowl overtones.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* Right Column: Avatar Stack, Introductory Copy & CTAs inside Framed Container */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 lg:pl-6">
            
            {/* Framed Content Container matching Dribbble */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/60 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-purple-200/50 shadow-xl shadow-purple-900/5 space-y-7 relative"
            >
              {/* Subtle top-right contour accent */}
              <div className="absolute top-3 right-4 text-[10px] text-gray-400 font-mono tracking-widest uppercase">
                Aora • 5th Ave Nairobi
              </div>

              {/* 5 Avatar Stack in Horizontal Row with Absolute Floating Tooltip */}
              <div className="relative space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-3.5 hover:space-x-1 transition-all duration-300">
                    {THERAPISTS.map((therapist) => (
                      <div
                        key={therapist.id}
                        className="relative group/avatar cursor-pointer"
                        onMouseEnter={() => setActiveAvatarHover(therapist)}
                        onMouseLeave={() => setActiveAvatarHover(null)}
                        onClick={() => onOpenBooking(therapist.specialties[0], therapist.id)}
                      >
                        <img
                          src={therapist.avatar}
                          alt={therapist.name}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
                          }}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md transition-transform group-hover/avatar:scale-115 group-hover/avatar:z-20 ring-2 ring-purple-100"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                      </div>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-purple-900 ml-2 bg-purple-100/70 px-2.5 py-1 rounded-full">
                    Lead: Anyango Omondi
                  </span>
                </div>

                {/* Floating Popover - Absolute positioning prevents layout shift */}
                <AnimatePresence>
                  {activeAvatarHover && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-3 z-30 w-72 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-200 shadow-2xl flex items-center justify-between gap-3 text-xs pointer-events-none"
                    >
                      <div>
                        <div className="font-bold text-gray-900">{activeAvatarHover.name}</div>
                        <div className="text-[11px] text-purple-700">{activeAvatarHover.title} • {activeAvatarHover.badge}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onOpenBooking(activeAvatarHover.specialties[0], activeAvatarHover.id)}
                        className="bg-[#A78BFA] text-white px-3 py-1.5 rounded-full font-semibold text-[11px] hover:bg-[#9270f2] transition-colors shrink-0 pointer-events-auto"
                      >
                        Book
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Exact Copy tailored for Aora Mental Wellness & Anyango Omondi */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Welcome to <span className="font-semibold text-gray-900">Aora Mental Wellness</span>, led by consultant psychologist <span className="font-semibold text-purple-900">Anyango Omondi</span> at 5th Avenue, Nairobi, Kenya. We provide compassionate, confidential psychotherapy and somatic regulation both in-person and online.
                </p>
              </div>

              {/* Action Buttons: Start Cure > and Watch review */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking('Individual Therapy')}
                  className="group bg-[#A78BFA] hover:bg-[#9270f2] text-white px-7 py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-purple-300/40 hover:shadow-purple-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2.5"
                  id="hero-start-cure-btn"
                >
                  <span>Start Cure</span>
                  <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onOpenStory}
                  className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-purple-900 px-4 py-3.5 rounded-full hover:bg-purple-50/50 transition-colors flex items-center gap-2 cursor-pointer"
                  id="hero-watch-review-btn"
                >
                  <span>Watch review</span>
                </button>
              </div>

              {/* Clinical Trust Points */}
              <div className="pt-4 border-t border-purple-100 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>HIPAA Compliant</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span>4.98/5 Rating</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>4,800+ Clients</span>
                </span>
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
