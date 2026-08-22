import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  // Size mapping for mark and typography
  const sizeConfig = {
    sm: {
      mark: 'w-7 h-7',
      title: 'text-lg',
      subtitle: 'text-[8.5px]',
      gap: 'gap-2',
    },
    md: {
      mark: 'w-9 h-9',
      title: 'text-xl sm:text-2xl',
      subtitle: 'text-[9.5px]',
      gap: 'gap-2.5',
    },
    lg: {
      mark: 'w-12 h-12',
      title: 'text-2xl sm:text-3xl',
      subtitle: 'text-[11px]',
      gap: 'gap-3',
    },
    xl: {
      mark: 'w-16 h-16',
      title: 'text-3xl sm:text-4xl',
      subtitle: 'text-xs',
      gap: 'gap-3.5',
    },
  }[size];

  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center ${sizeConfig.gap} select-none group ${className}`} id="aora-brand-identity">
      {/* 
        AORA Emblem: "The Resonant Sanctuary & Ascending Breath"
        - Outer sheltering arc: Unconditional positive regard, psychological safety, and somatic holding.
        - Ascending inner petal: Gradual neuro-restoration, emotional clarity, and renewal.
        - Golden nucleus: The innate resilient spark of the self.
      */}
      <div className={`relative ${sizeConfig.mark} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
          aria-hidden="true"
        >
          <defs>
            {/* Primary Plum & Orchid Gradient */}
            <linearGradient id="aoraGradientPrimary" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#6D28D9" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>

            {/* Soft Dawn / Hope Accent Gradient */}
            <linearGradient id="aoraGradientDawn" x1="18" y1="12" x2="36" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C4B5FD" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            {/* Golden Core Light */}
            <linearGradient id="aoraGradientGold" x1="22" y1="20" x2="30" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Background Soft Zen Circle Container */}
          <circle
            cx="24"
            cy="24"
            r="22"
            className={isLight ? 'fill-white/10 stroke-white/20' : 'fill-purple-50/70 stroke-purple-100/60'}
            strokeWidth="1"
          />

          {/* Outer Protective Sanctuary Arc (Continuous Embracing Loop) */}
          <path
            d="M 24,7 
               C 33.388,7 41,14.612 41,24 
               C 41,33.388 33.388,41 24,41 
               C 15.5,41 8.5,34.8 7.3,26.5 
               C 6.9,23.8 8.8,21.5 11.5,21.5 
               C 13.8,21.5 15.8,23.2 16.2,25.4 
               C 17,29.8 20.8,33 24,33 
               C 28.97,33 33,28.97 33,24 
               C 33,19.03 28.97,15 24,15 
               C 20.5,15 17.5,17 16,20"
            stroke={isLight ? '#FFFFFF' : 'url(#aoraGradientPrimary)'}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ascending Mindful Leaf / Wave of Hope */}
          <path
            d="M 24,16 
               C 28.5,19 30,23.5 28.5,27.5 
               C 27.2,31 23,32.5 19.5,30 
               C 16.5,27.8 16.5,23.2 19,19.5 
               C 20.5,17.2 22.2,16.4 24,16 Z"
            fill={isLight ? '#DDD6FE' : 'url(#aoraGradientDawn)'}
            fillOpacity={isLight ? '0.9' : '0.85'}
          />

          {/* Central Awakening Spark / Core Self Point */}
          <circle
            cx="24"
            cy="24"
            r="2.6"
            fill="url(#aoraGradientGold)"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Typographic Lockup */}
      <div className="flex flex-col justify-center text-left">
        <div className="flex items-baseline gap-1">
          <span
            className={`font-serif tracking-tight font-light leading-none ${sizeConfig.title} ${
              isLight ? 'text-white' : 'text-gray-900'
            }`}
            style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
          >
            Aora
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-purple-600 to-amber-500 mb-0.5 inline-block shrink-0" />
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`font-sans uppercase font-semibold tracking-[0.22em] ${sizeConfig.subtitle} ${
                isLight ? 'text-purple-200/90' : 'text-purple-900/80'
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}
            >
              Mental Wellness
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
