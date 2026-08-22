import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Sparkles, Sliders, TrendingUp, ShieldCheck, Zap, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { CLINICAL_METRICS } from '../data/wellnessData';

interface WellnessTrackerProps {
  onOpenBooking: (pathway?: string) => void;
}

export const WellnessTrackerVisualizer: React.FC<WellnessTrackerProps> = ({ onOpenBooking }) => {
  const [calmScore, setCalmScore] = useState<number>(45);
  const [clarityScore, setClarityScore] = useState<number>(55);
  const [sleepScore, setSleepScore] = useState<number>(40);
  const [connectionScore, setConnectionScore] = useState<number>(60);

  // Compute composite equilibrium index
  const compositeIndex = Math.round((calmScore * 0.3 + clarityScore * 0.25 + sleepScore * 0.25 + connectionScore * 0.2));

  // Determine personalized recommendation
  let recommendedProtocol = 'Foundational Individual Therapy';
  let recommendedFocus = 'Holistic Nervous System Balancing';
  let protocolExplanation = 'Synthesizing CBT cognitive tools with daily diaphragmatic regulation to restore baseline equilibrium.';

  if (sleepScore < 45) {
    recommendedProtocol = 'Circadian & Neuro-Sleep Mastery';
    recommendedFocus = 'Sleep Architecture & Vagus Regulation';
    protocolExplanation = 'Clinical CBT-I protocols and light therapy architecture to eliminate midnight cognitive arousal.';
  } else if (connectionScore < 50) {
    recommendedProtocol = 'Couples & Relational Therapy';
    recommendedFocus = 'Attachment & Somatic Co-Regulation';
    protocolExplanation = 'Rebuilding empathetic safety and repairing relational impasses with Emotionally Focused Therapy.';
  } else if (clarityScore < 50) {
    recommendedProtocol = 'Executive Burnout & Clarity Sprint';
    recommendedFocus = 'Cognitive Defusion & High-Stakes Recovery';
    protocolExplanation = 'High-leverage cognitive load re-engineering designed to reverse mental fatigue and restore focus.';
  }

  // Radar points generator
  const size = 260;
  const center = size / 2;
  const radius = size * 0.4;

  const points = [
    { label: 'Calm', value: calmScore, angle: -Math.PI / 2 },
    { label: 'Clarity', value: clarityScore, angle: 0 },
    { label: 'Sleep', value: sleepScore, angle: Math.PI / 2 },
    { label: 'Connection', value: connectionScore, angle: Math.PI },
  ];

  const currentPolygon = points
    .map((p) => {
      const r = (p.value / 100) * radius;
      const x = center + r * Math.cos(p.angle);
      const y = center + r * Math.sin(p.angle);
      return `${x},${y}`;
    })
    .join(' ');

  const targetPolygon = points
    .map((p) => {
      const boosted = Math.min(95, p.value + 35);
      const r = (boosted / 100) * radius;
      const x = center + r * Math.cos(p.angle);
      const y = center + r * Math.sin(p.angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-purple-100/60 relative overflow-hidden" id="biomarkers">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 text-purple-900 text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              <Activity className="w-3.5 h-3.5 text-purple-700" />
              <span>Interactive Biomarker Compass</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#1A1A1A]">
              Map your mental equilibrium <span className="text-purple-800 font-semibold italic">trajectory</span>
            </h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            Adjust your current daily levels below to visualize your autonomic balance radar and receive a real-time clinical care recommendation.
          </p>
        </div>

        {/* Interactive Grid: Sliders on Left, Dynamic Radar & Recommendation on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left: Interactive Sliders */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-xl shadow-purple-900/5 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Sliders className="w-4 h-4 text-[#A78BFA]" />
                  <span>Self-Reflection Check-In</span>
                </div>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                  Live Interactive
                </span>
              </div>

              {/* Slider 1: Calm */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-700">Nervous System Calm (Parasympathetic Tone)</span>
                  <span className="text-purple-700 font-bold">{calmScore}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={calmScore}
                  onChange={(e) => setCalmScore(Number(e.target.value))}
                  className="w-full accent-[#A78BFA] cursor-pointer h-2 bg-purple-50 rounded-lg"
                  id="slider-calm"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>High Chronic Tension</span>
                  <span>Deep Somatic Ease</span>
                </div>
              </div>

              {/* Slider 2: Clarity */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-700">Cognitive Clarity & Focus</span>
                  <span className="text-purple-700 font-bold">{clarityScore}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={clarityScore}
                  onChange={(e) => setClarityScore(Number(e.target.value))}
                  className="w-full accent-[#A78BFA] cursor-pointer h-2 bg-purple-50 rounded-lg"
                  id="slider-clarity"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Brain Fog & Overwhelm</span>
                  <span>Laser Sharp Clarity</span>
                </div>
              </div>

              {/* Slider 3: Sleep */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-700">Restorative Sleep & Recovery</span>
                  <span className="text-purple-700 font-bold">{sleepScore}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={sleepScore}
                  onChange={(e) => setSleepScore(Number(e.target.value))}
                  className="w-full accent-[#A78BFA] cursor-pointer h-2 bg-purple-50 rounded-lg"
                  id="slider-sleep"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Fragmented Insomnia</span>
                  <span>Deep Rejuvenation</span>
                </div>
              </div>

              {/* Slider 4: Connection */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-700">Emotional Connection & Relational Safety</span>
                  <span className="text-purple-700 font-bold">{connectionScore}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={connectionScore}
                  onChange={(e) => setConnectionScore(Number(e.target.value))}
                  className="w-full accent-[#A78BFA] cursor-pointer h-2 bg-purple-50 rounded-lg"
                  id="slider-connection"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Defensive / Isolated</span>
                  <span>Deep Resonance</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Composite Equilibrium Score</span>
              <span className="text-sm font-bold text-[#1A1A1A]">{compositeIndex}/100</span>
            </div>
          </div>

          {/* Right: Dynamic Radar Chart & Real-time Path Recommendation */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#171717] to-[#0A0A0A] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              
              {/* SVG Radar Visual */}
              <div className="flex flex-col items-center justify-center relative">
                <svg width={size} height={size} className="overflow-visible">
                  {/* Concentric Guideline Circles */}
                  <circle cx={center} cy={center} r={radius * 0.33} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <circle cx={center} cy={center} r={radius * 0.66} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.15)" />

                  {/* Axis lines */}
                  {points.map((p, i) => {
                    const x = center + radius * Math.cos(p.angle);
                    const y = center + radius * Math.sin(p.angle);
                    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="rgba(255,255,255,0.1)" />;
                  })}

                  {/* Target Projection Shape */}
                  <polygon
                    points={targetPolygon}
                    fill="rgba(167, 139, 250, 0.18)"
                    stroke="#C4B5FD"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Current Active Shape */}
                  <polygon
                    points={currentPolygon}
                    fill="rgba(167, 139, 250, 0.45)"
                    stroke="#A78BFA"
                    strokeWidth="2.5"
                  />

                  {/* Labels */}
                  <text x={center} y={center - radius - 10} textAnchor="middle" fill="#C4B5FD" fontSize="10" fontWeight="bold">CALM</text>
                  <text x={center + radius + 10} y={center + 4} textAnchor="start" fill="#C4B5FD" fontSize="10" fontWeight="bold">CLARITY</text>
                  <text x={center} y={center + radius + 16} textAnchor="middle" fill="#C4B5FD" fontSize="10" fontWeight="bold">SLEEP</text>
                  <text x={center - radius - 10} y={center + 4} textAnchor="end" fill="#C4B5FD" fontSize="10" fontWeight="bold">CONNECTION</text>
                </svg>

                <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A78BFA]"></span>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full border border-dashed border-[#C4B5FD]"></span>
                    <span>Projected Target</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Recommendation Card */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C4B5FD]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personalized Pathway</span>
                </div>

                <h3 className="text-xl font-bold text-white leading-snug">
                  {recommendedProtocol}
                </h3>

                <div className="text-xs text-purple-300 font-medium">
                  Focus: {recommendedFocus}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {protocolExplanation}
                </p>

                <div className="pt-2">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-300 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Est. 8-week resilience gain: +42%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Booking Trigger for Recommended Path */}
            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-400">
                Ready to calibrate your bespoke protocol with a licensed clinician?
              </div>
              <button
                type="button"
                onClick={() => onOpenBooking(recommendedProtocol)}
                className="w-full sm:w-auto bg-[#A78BFA] hover:bg-[#9270f2] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                id="apply-recommendation-btn"
              >
                <span>Book This Pathway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Clinical Proof Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CLINICAL_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight group-hover:text-purple-800 transition-colors">
                {metric.value}
              </div>
              <div className="text-xs font-bold text-gray-800 mt-2">
                {metric.label}
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
