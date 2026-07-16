export default function Loading() {
  return (
    <div className="relative min-h-[75vh] w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50 overflow-hidden px-4 select-none">
      {/* Dynamic Multi-Path Background Trail Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="loading-premium-topo"
              width="160"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M-40 40 Q 20 10, 80 40 T 200 40"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                className="text-(--dark) opacity-80"
              />
              <path
                d="M-40 80 Q 20 50, 80 80 T 200 80"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.2"
                className="text-(--dark) opacity-40"
              />
              <path
                d="M-40 0 Q 20 -30, 80 0 T 200 0"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
                className="text-(--dark) opacity-20"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loading-premium-topo)" />
        </svg>
      </div>

      {/* Ambient Micro-Glow Backdrop */}
      <div className="absolute h-40 w-40 rounded-full bg-(--primary)/10 blur-3xl animate-pulse pointer-events-none" />

      {/* Gyroscopic Spinner Elements */}
      <div className="relative flex items-center justify-center z-10">
        {/* Outer Ring */}
        <div className="h-16 w-16 rounded-full border-2 border-gray-200/60 border-t-(--primary) animate-spin" />

        {/* Inner Counter-Rotating Ring */}
        <div className="absolute h-11 w-11 rounded-full border-2 border-transparent border-b-(--secondary) animate-spin [animation-duration:0.8s] [animation-direction:reverse] opacity-90" />

        {/* Center Focal Dot */}
        <div className="absolute h-2 w-2 rounded-full bg-(--primary) animate-ping [animation-duration:1.5s]" />
      </div>

      {/* Synchronized Typography Layer */}
      <div className="mt-8 text-center z-10">
        <p className="text-sm font-semibold tracking-widest text-(--dark) uppercase animate-pulse">
          Mapping your trail
        </p>
        <p className="text-xs text-(--text-secondary) mt-1.5 font-medium tracking-wide">
          Finding coordinates...
        </p>
      </div>
    </div>
  );
}
