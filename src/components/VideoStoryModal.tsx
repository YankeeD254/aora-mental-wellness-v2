import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import storyPosterImg from '../assets/images/aora_potential_motion_1787330848607.jpg';

interface VideoStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const VideoStoryModal: React.FC<VideoStoryModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [progress, setProgress] = useState<number>(18);

  const chapters = [
    { title: 'The Genesis', time: '0:00', desc: 'Why traditional therapy felt incomplete without somatic nervous system healing.' },
    { title: 'Nature & Chrome', time: '1:15', desc: 'Uniting clinical technology with organic neurobiology.' },
    { title: 'The Sanctuary', time: '2:30', desc: 'Inside our immersive therapeutic spaces and virtual care pods.' },
    { title: 'The Future', time: '3:45', desc: 'Lifelong emotional resilience for creators, couples, and seekers.' },
  ];

  // Esc key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Simulate video playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 600);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-[#0F0F0F] text-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative flex flex-col"
        id="video-story-modal"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#A78BFA]/20 text-[#C4B5FD] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                The Aora Story: Cultivating Equilibrium
              </h3>
              <p className="text-xs text-gray-400">A short documentary on healing, science, and the modern mind</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Canvas / Player Simulation */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          {/* Cinematic Background Poster */}
          <img
            src={storyPosterImg || './assets/images/aora_potential_motion_1787330848607.jpg'}
            alt="Aora Documentary Still"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80';
            }}
            className="w-full h-full object-cover opacity-75"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Floating Subtitle / Narration Caption */}
          <div className="absolute bottom-16 left-6 right-6 text-center max-w-xl mx-auto">
            <p className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl text-xs sm:text-sm text-gray-200 inline-block border border-white/10 shadow-lg">
              "We didn't just want to talk about anxiety. We wanted to build a sanctuary where the body and brain finally align."
            </p>
          </div>

          {/* Center Play/Pause Overlay */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-[#A78BFA] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer z-20"
            aria-label={isPlaying ? 'Pause Story' : 'Play Story'}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>

          {/* Video Control Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-4 flex flex-col gap-2">
            {/* Progress line */}
            <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden cursor-pointer">
              <div
                className="bg-[#A78BFA] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-300 pt-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[11px] font-mono">01:42 / 04:30</span>
              </div>

              <span className="text-[11px] text-[#C4B5FD] font-medium hidden sm:inline">
                Cogni:Wave Cinematic Master • 4K HDR
              </span>
            </div>
          </div>
        </div>

        {/* Chapters & Bottom Action Bar */}
        <div className="p-6 bg-[#141414] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveChapter(idx);
                  setProgress(idx * 25 + 5);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeChapter === idx
                    ? 'bg-[#A78BFA] text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {ch.title}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBooking('Foundational Therapy');
            }}
            className="w-full sm:w-auto bg-[#A78BFA] hover:bg-[#9270f2] text-white px-6 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Begin Your Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
