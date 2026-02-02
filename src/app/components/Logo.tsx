interface LogoProps {
  size?: number;
  className?: string;
  variant?: "color" | "monochrome" | "mono";
  animated?: boolean;
}

export function Logo({ 
  size = 40, 
  className = "", 
  variant = "color",
  animated = false 
}: LogoProps) {
  const primaryColor = (variant === "monochrome" || variant === "mono") ? "#000000" : "#1E3D59";
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle - the lens of perception */}
      <circle
        cx="50"
        cy="50"
        r="42"
        stroke={primaryColor}
        strokeWidth="2.5"
        fill="none"
      />
      
      {/* Inner radiating thought lines - ideas expanding */}
      {/* Top */}
      <line x1="50" y1="50" x2="50" y2="20" stroke={primaryColor} strokeWidth="2" opacity="0.6" />
      
      {/* Top-right */}
      <line x1="50" y1="50" x2="71" y2="29" stroke={primaryColor} strokeWidth="2" opacity="0.5" />
      
      {/* Right */}
      <line x1="50" y1="50" x2="80" y2="50" stroke={primaryColor} strokeWidth="2.5" opacity="0.8" />
      
      {/* Bottom-right */}
      <line x1="50" y1="50" x2="71" y2="71" stroke={primaryColor} strokeWidth="2" opacity="0.5" />
      
      {/* Bottom */}
      <line x1="50" y1="50" x2="50" y2="80" stroke={primaryColor} strokeWidth="2" opacity="0.6" />
      
      {/* Bottom-left */}
      <line x1="50" y1="50" x2="29" y2="71" stroke={primaryColor} strokeWidth="2" opacity="0.5" />
      
      {/* Left */}
      <line x1="50" y1="50" x2="20" y2="50" stroke={primaryColor} strokeWidth="2" opacity="0.6" />
      
      {/* Top-left */}
      <line x1="50" y1="50" x2="29" y2="29" stroke={primaryColor} strokeWidth="2" opacity="0.5" />
      
      {/* Center core - the thinking mind */}
      <circle
        cx="50"
        cy="50"
        r="8"
        fill={primaryColor}
      />
      
      {/* Secondary ring - layers of thought */}
      <circle
        cx="50"
        cy="50"
        r="24"
        stroke={primaryColor}
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
        strokeDasharray="4 4"
      />
      
      {/* Outer accent dots - ideas manifesting */}
      <circle cx="50" cy="15" r="3" fill={primaryColor} opacity="0.7" />
      <circle cx="76" cy="24" r="2.5" fill={primaryColor} opacity="0.5" />
      <circle cx="85" cy="50" r="3.5" fill={primaryColor} opacity="0.9" />
      <circle cx="76" cy="76" r="2.5" fill={primaryColor} opacity="0.5" />
      <circle cx="50" cy="85" r="3" fill={primaryColor} opacity="0.7" />
      <circle cx="24" cy="76" r="2.5" fill={primaryColor} opacity="0.5" />
      <circle cx="15" cy="50" r="3" fill={primaryColor} opacity="0.7" />
      <circle cx="24" cy="24" r="2.5" fill={primaryColor} opacity="0.5" />
    </svg>
  );
}