import Link from 'next/link';
import { Compass, MoveRight } from 'lucide-react';
import Container from '@/components/Ui/Container';
import Button from '@/components/Ui/Button';

export default function NotFound() {
  return (
    <div className="relative min-h-[88vh] w-full flex items-center bg-gradient-to-br from-green-50 via-white to-orange-50/70 overflow-hidden select-none">
      {/* 1. Multi-Path Premium Background Trail Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="notfound-premium-topo"
              width="180"
              height="140"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M-40 40 Q 30 10, 90 40 T 220 40"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                className="text-(--dark) opacity-80"
              />
              <path
                d="M-40 90 Q 30 60, 90 90 T 220 90"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.2"
                className="text-(--dark) opacity-40"
              />
              <path
                d="M-40 0 Q 30 -30, 90 0 T 220 0"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
                className="text-(--dark) opacity-20"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#notfound-premium-topo)" />
        </svg>
      </div>

      {/* 2. Soft Ambient Lighting Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-green-200/20 to-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* 3. Massive Elegant Background Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] font-black text-[26vw] md:text-[22vw] leading-none tracking-tighter text-(--dark) select-none z-0">
        404
      </div>

      <Container className="relative z-10 w-full">
        <div className="mx-auto max-w-xl text-center flex flex-col items-center">
          {/* 4. Interactive Floating Compass Emblem with Radar Waves */}
          <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
            {/* Concentric Radar Pulses */}
            <div className="absolute inset-0 rounded-3xl bg-(--primary)/10 animate-ping opacity-40 [animation-duration:2s]" />
            <div className="absolute -inset-4 rounded-3xl bg-(--primary)/5 animate-ping opacity-20 [animation-duration:3s]" />

            {/* The main card shell wrapper */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-2xl border border-gray-100/90 text-(--primary) backdrop-blur-md transition-transform duration-300 hover:scale-105">
              <Compass
                size={38}
                className="animate-spin [animation-duration:20s] ease-in-out"
              />
            </div>
          </div>

          {/* 5. Typography Segment */}
          <span className="text-xs font-bold tracking-widest text-(--primary) uppercase bg-green-100/60 backdrop-blur-sm border border-green-200/30 px-4 py-1.5 rounded-full mb-4">
            Signal Disconnected
          </span>

          <h1 className="text-4xl font-black tracking-tight text-(--dark) sm:text-5xl md:text-6xl max-w-md leading-[1.1]">
            Lost in the <span className="text-(--primary)">Wilderness</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-(--text-secondary) leading-relaxed max-w-md font-medium opacity-90">
            The coordinates you followed led off the map grid. Let&apos;s guide
            you back to camp before nightfall.
          </p>

          {/* 6. Action Link Button Trigger */}
          <div className="mt-10">
            <Link href="/" className="group inline-block">
              <Button
                variant="primary"
                className="inline-flex items-center gap-3 rounded-full px-8 h-14 font-semibold shadow-lg shadow-(--primary)/10 hover:shadow-(--primary)/20 hover:-translate-y-0.5 transition-all duration-200 text-base"
              >
                <span>Return to Base Camp</span>
                <MoveRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
