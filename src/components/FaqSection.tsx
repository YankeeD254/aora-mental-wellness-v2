import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQS } from '../data/wellnessData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Therapy', 'General', 'Insurance & Pricing', 'Privacy'];

  const filteredFaqs = selectedCat === 'All'
    ? FAQS
    : FAQS.filter(f => f.category === selectedCat);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-purple-100/60" id="faq">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-[11px] font-bold tracking-[0.2em] uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-purple-700" />
            <span>Common Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#1A1A1A]">
            Frequently asked <span className="text-purple-900 font-semibold italic">questions</span>
          </h2>
          <p className="text-sm text-gray-600">
            Everything you need to know about our clinical standards, privacy protocols, and getting started.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-purple-100/80 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-purple-50/30 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-gray-900">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-800 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#A78BFA] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
