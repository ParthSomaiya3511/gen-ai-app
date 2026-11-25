function BackgroundEffects() {
  return (
    <div className="wave-container">
      <svg 
        className="water-caustics-svg" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 800" 
        preserveAspectRatio="none"
      >
        <defs>
          {/* Calibrated blur values to keep paths visible without washing them out */}
          <filter id="soft-blur">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <filter id="light-blur">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          
          <linearGradient id="sky-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="sky-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#99f6e4" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="highlight-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base soft blue gradient background waves */}
        <path 
          className="ripple-layer-1" 
          d="M-100,100 C300,300 700,50 1200,250 C1400,350 1600,200 1600,100 L1600,0 L-100,0 Z" 
          fill="url(#sky-grad-1)" 
          filter="url(#soft-blur)" 
        />
        
        <path 
          className="ripple-layer-2" 
          d="M-50,200 C450,-50 950,300 1500,50 L1500,0 L-50,0 Z" 
          fill="url(#sky-grad-2)" 
          filter="url(#soft-blur)" 
        />

        {/* Dynamic bright water caustics highlights matching your mockup */}
        <path 
          className="ripple-layer-3" 
          d="M-100,250 Q350,50 800,200 T1700,50" 
          fill="none" 
          stroke="url(#highlight-grad)" 
          strokeWidth="35" 
          filter="url(#light-blur)" 
        />

        <path 
          className="ripple-layer-4" 
          d="M-50,150 Q450,300 950,100 T1600,250" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="15" 
          filter="url(#light-blur)" 
          opacity="0.65" 
        />

        <path 
          className="ripple-layer-5" 
          d="M100,350 Q600,150 1100,300 T1600,100" 
          fill="none" 
          stroke="rgba(224, 242, 254, 0.45)" 
          strokeWidth="25" 
          filter="url(#soft-blur)" 
        />
      </svg>
    </div>
  );
}

export default BackgroundEffects;