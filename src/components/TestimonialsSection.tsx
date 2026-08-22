import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star, Sparkles, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data/wellnessData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-purple-100/60" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-[11px] font-bold tracking-[0.2em] uppercase">
            <Heart className="w-3.5 h-3.5 text-purple-700" />
            <span>Patient Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#1A1A1A]">
            Transformative shifts in <span className="text-purple-900 font-semibold italic">real lives</span>
          </h2>

          <p className="text-sm text-gray-600">
            Hear from individuals and partners who transformed their relationship to anxiety, burnout, and emotional vitality with Aora.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 rounded-3xl border border-purple-100/80 shadow-lg shadow-purple-900/5 flex flex-col justify-between group hover:-translate-y-1 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                    {testimonial.focus}
                  </span>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-3.5">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80';
                  }}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-100"
                />
                <div>
                  <div className="text-sm font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-xs text-gray-500">{testimonial.role} • {testimonial.location}</div>
                  <div className="text-[10px] text-purple-600 font-medium mt-0.5">{testimonial.timeframe}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
