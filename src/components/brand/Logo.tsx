import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "emblem";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: { icon: 32, text: "text-xl" },
  md: { icon: 40, text: "text-2xl" },
  lg: { icon: 48, text: "text-3xl" },
  xl: { icon: 64, text: "text-4xl" },
};

// Icon-only logo - Stylized "PF" with dynamic figure
const LogoIcon = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    {/* Shield/badge background */}
    <path
      d="M24 4L6 12V22C6 33.05 13.68 43.22 24 46C34.32 43.22 42 33.05 42 22V12L24 4Z"
      fill="url(#shieldGradient)"
      fillOpacity="0.1"
      stroke="url(#shieldGradient)"
      strokeWidth="1.5"
    />
    
    {/* Dynamic figure / barbell hybrid */}
    <circle cx="24" cy="14" r="4" fill="url(#shieldGradient)" />
    <path
      d="M24 18V26"
      stroke="url(#shieldGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M16 22H32"
      stroke="url(#shieldGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="14" cy="22" r="3" fill="url(#shieldGradient)" />
    <circle cx="34" cy="22" r="3" fill="url(#shieldGradient)" />
    <path
      d="M20 26L24 36L28 26"
      stroke="url(#shieldGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    <defs>
      <linearGradient id="shieldGradient" x1="6" y1="4" x2="42" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(158, 64%, 52%)" />
        <stop offset="0.5" stopColor="hsl(180, 60%, 45%)" />
        <stop offset="1" stopColor="hsl(195, 85%, 55%)" />
      </linearGradient>
    </defs>
  </svg>
);

// Emblem logo - circular badge style
const LogoEmblem = ({ size = 48 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    {/* Outer ring */}
    <circle
      cx="32"
      cy="32"
      r="30"
      stroke="url(#emblemGradient)"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="32"
      cy="32"
      r="26"
      stroke="url(#emblemGradient)"
      strokeWidth="1"
      strokeOpacity="0.3"
      fill="none"
    />
    
    {/* PF Letters stylized */}
    <text
      x="32"
      y="38"
      textAnchor="middle"
      className="font-display"
      fill="url(#emblemGradient)"
      fontSize="24"
      fontWeight="bold"
      fontFamily="Bebas Neue, sans-serif"
    >
      PF
    </text>
    
    {/* Small decorative elements */}
    <circle cx="16" cy="32" r="2" fill="url(#emblemGradient)" />
    <circle cx="48" cy="32" r="2" fill="url(#emblemGradient)" />
    
    <defs>
      <linearGradient id="emblemGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(158, 64%, 52%)" />
        <stop offset="0.5" stopColor="hsl(180, 60%, 45%)" />
        <stop offset="1" stopColor="hsl(195, 85%, 55%)" />
      </linearGradient>
    </defs>
  </svg>
);

const Logo = ({ variant = "full", className, size = "md" }: LogoProps) => {
  const { icon: iconSize, text: textSize } = sizeMap[size];

  if (variant === "icon") {
    return <LogoIcon size={iconSize} />;
  }

  if (variant === "emblem") {
    return <LogoEmblem size={iconSize * 1.5} />;
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoIcon size={iconSize} />
      <div className="flex flex-col">
        <span className={cn("font-display tracking-wider text-foreground leading-none", textSize)}>
          PATHAN <span className="text-gradient">FITNESS</span>
        </span>
        <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mt-0.5">
          Gym · Health, Fit for life
        </span>
      </div>
    </div>
  );
};

export default Logo;
export { LogoIcon, LogoEmblem };
