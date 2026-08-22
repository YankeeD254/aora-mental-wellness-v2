import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Clock, Calendar, Sparkles, ArrowRight, ShieldCheck, User, Tag } from 'lucide-react';
import { ServiceProgram, ApproachTab } from '../types';

interface ServiceDetailModalProps {
  service: ServiceProgram | null;
  approach: ApproachTab | null;
  onClose: () => void;
  onBook: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  approach,
  onClose,
  onBook,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!service && !approach) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-white w-full max-w-xl h-full shadow-2xl overflow-y-auto flex flex-col justify-between"
        id="service-detail-drawer"
      >
        <div>
          {/* Top Bar */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
                {service ? service.category : approach?.badge}
              </span>
              <span className="text-xs text-gray-500 font-medium">Clinical Protocol</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header Image */}
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md">
              <img
                src={service ? service.image : approach?.image}
                alt={service ? service.title : approach?.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover object-top sm:object-center"
              />
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                {service ? service.title : approach?.headline}
              </h3>
              <p className="text-sm font-semibold text-purple-700 mt-1">
                {service ? service.tagline : approach?.subtitle}
              </p>
            </div>

            {/* Overview / Clinical Blueprint */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Clinical Overview
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service ? service.longDescription : approach?.description}
              </p>
            </div>

            {/* If Service: Pricing & Specifications Grid */}
            {service && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs">
                <div>
                  <div className="text-gray-500 font-medium">Duration</div>
                  <div className="font-bold text-gray-900 mt-0.5">{service.duration}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium">Cadence</div>
                  <div className="font-bold text-gray-900 mt-0.5">{service.sessions}</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-gray-500 font-medium">Fee</div>
                  <div className="font-bold text-purple-900 mt-0.5">{service.price} / session</div>
                </div>
              </div>
            )}

            {/* What this program includes */}
            {service && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Care Container Includes
                </h4>
                <div className="space-y-2">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* If Approach Tab: Detailed clinical points */}
            {approach && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Core Scientific Pillars
                </h4>
                <div className="space-y-3">
                  {approach.detailedPoints.map((pt, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="text-xs font-bold text-gray-900">{pt.title}</div>
                      <div className="text-xs text-gray-600 mt-0.5">{pt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target Symptoms & Modalities */}
            {service && (
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Recommended For
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {service.recommendedFor.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Evidence-Based Modalities
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {service.methods.map((method, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-purple-50 text-purple-900 text-xs font-semibold">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer CTA */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-gray-500">Ready to consult?</div>
            <div className="text-xs font-bold text-gray-900">Immediate intake availability</div>
          </div>

          <button
            type="button"
            onClick={() => {
              const title = service ? service.title : approach ? approach.title : 'General Consultation';
              onClose();
              onBook(title);
            }}
            className="bg-[#A78BFA] hover:bg-[#9270f2] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Book This Program</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
