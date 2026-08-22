import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, UserCheck, Calendar, ArrowRight, HeartHandshake, CheckCircle } from 'lucide-react';
import { THERAPISTS } from '../data/wellnessData';
import { Therapist } from '../types';

interface TherapistSpotlightProps {
  onOpenBooking: (focusArea?: string, therapistId?: string) => void;
}

export const TherapistSpotlight: React.FC<TherapistSpotlightProps> = ({ onOpenBooking }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  const specialties = ['All', 'Anxiety & Panic', 'Couples Resonance', 'Trauma Integration', 'Circadian Medicine', 'Mind-Body'];

  const filteredTherapists = selectedSpecialty === 'All'
    ? THERAPISTS
    : THERAPISTS.filter(t => t.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase())));

  return (
    <section className="py-24 bg-[#FAF9F6] relative" id="therapists">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 border border-purple-200/60 text-purple-900 text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              <HeartHandshake className="w-3.5 h-3.5 text-purple-700" />
              <span>Clinical Team</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#1A1A1A]">
              Compassionate guidance from <span className="text-purple-900 font-semibold italic">licensed clinicians</span>
            </h2>
          </div>
          
          <p className="text-sm text-gray-600 max-w-md">
            Every Aora practitioner holds doctoral or master level licensure with minimum 8+ years of dedicated clinical practice.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {specialties.map(spec => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Therapist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((therapist) => (
            <motion.div
              key={therapist.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 border border-purple-100/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Avatar and Rating Row */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative shrink-0">
                    <img
                      src={therapist.avatar}
                      alt={therapist.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-16 h-16 rounded-2xl object-cover object-top ring-2 ring-purple-100"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" title="Available for intake" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold mb-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{therapist.rating}</span>
                      <span className="text-gray-400 font-normal">({therapist.reviewsCount} reviews)</span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-900 transition-colors truncate">
                      {therapist.name}
                    </h3>
                    <div className="text-xs text-purple-700 font-medium truncate">
                      {therapist.title}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 italic mb-3">
                  {therapist.credentials}
                </p>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                  {therapist.bio}
                </p>

                {/* Specialties Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {therapist.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-900 text-[11px] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer with Availability & Booking */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <div className="text-[11px] text-gray-500">
                  <span>Available: </span>
                  <span className="font-semibold text-gray-700">{therapist.availableDays.join(', ')}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenBooking(therapist.specialties[0], therapist.id)}
                  className="bg-[#A78BFA] hover:bg-[#9270f2] text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <span>Book with {therapist.name.split(',')[0]}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
