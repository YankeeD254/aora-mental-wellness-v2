import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Clock, Calendar, Check, Layers, UserCheck } from 'lucide-react';
import { SERVICE_PROGRAMS } from '../data/wellnessData';
import { ServiceProgram, ServiceCategory } from '../types';

interface ServicesSectionProps {
  onOpenBooking: (serviceName?: string) => void;
  onSelectServiceDetail: (service: ServiceProgram) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBooking,
  onSelectServiceDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');

  const categories: ServiceCategory[] = ['All', 'Individual', 'Couples', 'Group', 'Workshops'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICE_PROGRAMS
    : SERVICE_PROGRAMS.filter((s) => s.category === selectedCategory);

  return (
    <section className="py-28 bg-[#FAF9F6] relative" id="services">
      {/* Background Subtle Gradient */}
      <div className="absolute top-20 left-1/3 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 border border-purple-200/60 text-purple-900 text-[11px] font-bold tracking-[0.2em] uppercase">
            <Layers className="w-3.5 h-3.5 text-purple-700" />
            <span>Services & Programs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A] leading-tight">
            Tailored solutions for your{' '}
            <span className="text-purple-900 font-semibold italic">well-being</span>
          </h2>

          <p className="text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
            From focused 1-on-1 psychotherapy to immersive circadian restoration workshops, choose the pathway tailored to your life.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-md shadow-black/10 scale-105'
                    : 'bg-white text-gray-600 border border-gray-200/80 hover:border-purple-300 hover:text-[#1A1A1A]'
                }`}
                id={`filter-${category.toLowerCase()}`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl overflow-hidden border border-purple-100/70 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
                id={`service-card-${service.id}`}
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover object-top sm:object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Category & Price Pill */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1A1A1A] text-xs font-bold shadow-xs">
                        {service.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-4">
                      <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-semibold">
                        {service.price} <span className="text-[10px] text-gray-300">/ session</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <div className="text-[11px] font-semibold text-purple-700 tracking-wide uppercase">
                        {service.tagline}
                      </div>
                      <h3 className="text-xl font-bold text-[#1A1A1A] mt-1 group-hover:text-purple-900 transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer with CTAs */}
                <div className="p-6 sm:p-7 pt-0 border-t border-gray-50 flex items-center justify-between gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => onSelectServiceDetail(service)}
                    className="text-xs font-bold text-gray-700 hover:text-purple-900 py-2.5 transition-colors cursor-pointer"
                    id={`details-btn-${service.id}`}
                  >
                    More details
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBooking(service.title)}
                    className="bg-[#A78BFA] hover:bg-[#9270f2] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                    id={`book-btn-${service.id}`}
                  >
                    <span>Book Care</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
