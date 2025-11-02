import { useState, useEffect } from "react";

const AIUpdateIndicator = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative w-16 h-16 flex-shrink-0">
        {/* Nucleus - centre lumineux bleu */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
        
        {/* Orbit 1 - rotation lente */}
        <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '4s' }}>
          <ellipse
            cx="32"
            cy="32"
            rx="28"
            ry="12"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />
          {/* Particule lumineuse sur orbite 1 */}
          <circle cx="60" cy="32" r="2" fill="#60a5fa" className="drop-shadow-[0_0_8px_rgba(96,165,250,1)]">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M 32,20 A 28,12 0 1,1 32,44 A 28,12 0 1,1 32,20"
            />
          </circle>
        </svg>

        {/* Orbit 2 - rotation moyenne, angle différent */}
        <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '3s', transform: 'rotate(60deg)' }}>
          <ellipse
            cx="32"
            cy="32"
            rx="28"
            ry="12"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />
          {/* Particule lumineuse sur orbite 2 */}
          <circle cx="60" cy="32" r="2" fill="#3b82f6" className="drop-shadow-[0_0_8px_rgba(59,130,246,1)]">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path="M 32,20 A 28,12 0 1,1 32,44 A 28,12 0 1,1 32,20"
            />
          </circle>
        </svg>

        {/* Orbit 3 - rotation rapide, autre angle */}
        <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '5s', transform: 'rotate(-60deg)' }}>
          <ellipse
            cx="32"
            cy="32"
            rx="28"
            ry="12"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />
          {/* Particule lumineuse sur orbite 3 */}
          <circle cx="60" cy="32" r="2" fill="#93c5fd" className="drop-shadow-[0_0_8px_rgba(147,197,253,1)]">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path="M 32,20 A 28,12 0 1,1 32,44 A 28,12 0 1,1 32,20"
            />
          </circle>
        </svg>
      </div>
      
      <span className="text-white/70 text-sm">
        Dernière mise à jour IA : {currentTime.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </span>
    </div>
  );
};

export default AIUpdateIndicator;
