import React from "react";

interface AtomIconProps {
  className?: string;
  size?: number; // fallback size in px
  ariaLabel?: string;
}

const AtomIcon: React.FC<AtomIconProps> = ({ className, size = 64, ariaLabel = "Icône atomique animée" }) => {
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* léger glow doux */}
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Chemins d'orbite (réutilisés) */}
        <path id="orbit0" d="M100 64a86 36 0 1 1 0 72a86 36 0 1 1 0-72" pathLength="1000" />
        <path
          id="orbit1"
          d="M100 64a86 36 0 1 1 0 72a86 36 0 1 1 0-72"
          transform="rotate(55 100 100)"
          pathLength="1000"
        />
        <path
          id="orbit2"
          d="M100 64a86 36 0 1 1 0 72a86 36 0 1 1 0-72"
          transform="rotate(-55 100 100)"
          pathLength="1000"
        />
      </defs>

      {/* Anneaux visibles - utilisent currentColor pour respecter le thème */}
      <g className="text-foreground/50" stroke="currentColor" strokeWidth="2" fill="none">
        <use href="#orbit0" />
        <use href="#orbit1" />
        <use href="#orbit2" />
      </g>

      {/* Serpents (tête + traînée) */}
      <g strokeLinecap="round" filter="url(#softGlow)" className="text-foreground">
        {/* ORBITE 0° */}
        <use
          href="#orbit0"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="26 974"
        >
          <animate attributeName="stroke-dashoffset" values="26;-974" dur="16s" repeatCount="indefinite" begin="0s" />
        </use>
        <circle r="3" fill="currentColor">
          <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" begin="0s">
            <mpath href="#orbit0" />
          </animateMotion>
        </circle>

        {/* ORBITE +55° */}
        <use
          href="#orbit1"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="26 974"
        >
          <animate attributeName="stroke-dashoffset" values="26;-974" dur="16s" repeatCount="indefinite" begin="5s" />
        </use>
        <circle r="3" fill="currentColor">
          <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" begin="5s">
            <mpath href="#orbit1" />
          </animateMotion>
        </circle>

        {/* ORBITE −55° */}
        <use
          href="#orbit2"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="26 974"
        >
          <animate attributeName="stroke-dashoffset" values="26;-974" dur="16s" repeatCount="indefinite" begin="10s" />
        </use>
        <circle r="3" fill="currentColor">
          <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" begin="10s">
            <mpath href="#orbit2" />
          </animateMotion>
        </circle>
      </g>

      {/* Pas de label "IA" par défaut pour éviter toute mention d'AI */}
    </svg>
  );
};

export default AtomIcon;
