export function Logo({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      {...props}
    >
      <defs>
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g transform="translate(10, 10)">
        {/* Hexagon Shape */}
        <polygon
          points="50,5 93,28 93,72 50,95 7,72 7,28"
          fill="none"
          stroke="#5b4dff"
          strokeWidth="3"
          filter="url(#neon-glow)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* "W" Text */}
        <text
          x="50"
          y="68"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="900"
          fontSize="50"
          fill="white"
          textAnchor="middle"
          filter="url(#neon-glow)"
        >
          W
        </text>
        {/* Dot */}
        <circle cx="93" cy="22" r="3" fill="#5b4dff" filter="url(#neon-glow)"/>
        <circle cx="93" cy="22" r="1.5" fill="white"/>
      </g>
    </svg>
  );
}
