interface LogoProps {
  size?: number;
  className?: string;
  variant?: "color" | "monochrome";
  animated?: boolean;
}

export function Logo({ 
  size = 40, 
  className = "", 
  variant = "color",
  animated = false 
}: LogoProps) {
  const primaryColor = variant === "color" ? "#FA9819" : "#000000";
  const secondaryColor = variant === "color" ? "#1E3D59" : "#000000";
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Modern Geometric Shape - Hexagon Foundation */}
      <path
        d="M 120 40 L 180 80 L 180 160 L 120 200 L 60 160 L 60 80 Z"
        stroke={secondaryColor}
        strokeWidth="3"
        fill="none"
        opacity="0.15"
      />
      
      {/* Inner Data Point */}
      <circle 
        cx="120" 
        cy="120" 
        r="10" 
        fill={primaryColor}
        className={animated ? "animate-pulse" : ""}
      />
      
      {/* Data Flow Lines - Simplified & Geometric */}
      <g>
        {/* Right Flow */}
        <path
          d="M 130 120 L 165 120"
          stroke={primaryColor}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="170" cy="120" r="5" fill={primaryColor} opacity="0.8" />
        
        {/* Upper Right Flow */}
        <path
          d="M 125 110 L 152 85"
          stroke={primaryColor}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.6"
        />
        <circle cx="157" cy="80" r="4" fill={primaryColor} opacity="0.6" />
        
        {/* Lower Right Flow */}
        <path
          d="M 125 130 L 152 155"
          stroke={primaryColor}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.6"
        />
        <circle cx="157" cy="160" r="4" fill={primaryColor} opacity="0.6" />
        
        {/* Left Flow */}
        <path
          d="M 110 120 L 75 120"
          stroke={secondaryColor}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="70" cy="120" r="5" fill={secondaryColor} opacity="0.5" />
        
        {/* Upper Left Flow */}
        <path
          d="M 115 110 L 88 85"
          stroke={secondaryColor}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.4"
        />
        <circle cx="83" cy="80" r="4" fill={secondaryColor} opacity="0.4" />
        
        {/* Lower Left Flow */}
        <path
          d="M 115 130 L 88 155"
          stroke={secondaryColor}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.4"
        />
        <circle cx="83" cy="160" r="4" fill={secondaryColor} opacity="0.4" />
      </g>
      
      {/* Outer Geometric Frame */}
      <circle
        cx="120"
        cy="120"
        r="85"
        stroke={secondaryColor}
        strokeWidth="2"
        fill="none"
        opacity="0.1"
      />
    </svg>
  );
}
