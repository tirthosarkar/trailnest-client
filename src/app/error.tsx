'use client';

import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  RefreshCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Container from '@/components/Ui/Container';
import Button from '@/components/Ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log the error securely to your telemetry system here
    console.error('Application Boundary Crash Log:', error);
  }, [error]);

  return (
    <div className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-red-50/30 via-white to-orange-50 overflow-hidden py-12">
      {/* Background Trail Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="error-topo"
            width="160"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M-40 40 Q 20 10, 80 40 T 200 40"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
            />
          </pattern>
          <rect
            width="100%"
            height="100%"
            fill="url(#error-topo)"
            className="text-(--dark)"
          />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        <div className="mx-auto max-w-xl text-center flex flex-col items-center">
          {/* Glassmorphic Alert Badge */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 shadow-md border border-red-100">
            <AlertTriangle size={30} />
          </div>

          <span className="text-sm font-bold tracking-widest text-red-500 uppercase mb-2">
            System Alert
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight text-(--dark) sm:text-4xl">
            Something Went Wrong
          </h1>

          <p className="mt-4 text-base text-(--text-secondary) leading-relaxed">
            An unexpected glitch blocked our connection layout paths. Let&apos;s
            try reloading the map data pipeline to clear it up.
          </p>

          {/* ========================================================
            COLLAPSIBLE ERROR DETAILS COMPONENT
            ======================================================== */}
          <div className="mt-6 w-full max-w-md border border-red-100 bg-red-50/20 rounded-xl overflow-hidden text-left">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-red-700/80 uppercase tracking-wider hover:bg-red-50/40 transition duration-150"
            >
              <span>View Technical Details</span>
              {showDetails ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>

            {showDetails && (
              <div className="px-4 pb-4 pt-1 border-t border-red-100/50">
                <p className="text-sm font-mono font-medium text-red-600 bg-white/80 p-3 rounded-lg border border-red-100/80 break-words shadow-inner">
                  {error.message || 'An unknown execution error occurred.'}
                </p>
                {error.digest && (
                  <p className="mt-2 text-[11px] font-mono text-gray-400">
                    ID Reference: {error.digest}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => reset()}
              className="bg-(--primary) text-white font-semibold rounded-full px-6 h-12 hover:bg-opacity-95 shadow-md flex items-center gap-2 group transition duration-200"
            >
              <RefreshCcw
                size={16}
                className="transition-transform duration-500 group-hover:rotate-180"
              />
              <span>Try Again</span>
            </Button>

            <button
              onClick={() => (window.location.href = '/')}
              //   className="text-sm font-semibold text-(--text-secondary) hover:text-(--dark) px-4 py-2 transition duration-200"
            >
              <Button variant="outline"> Return Home</Button>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
