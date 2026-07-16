import Link from "next/link";
import { ShieldAlert, MoveRight } from "lucide-react";
import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";

export default function ForbiddenPage() {
  return (
    <div className="relative min-h-[88vh] w-full flex items-center bg-gradient-to-br from-red-50/30 via-white to-orange-50/40 overflow-hidden select-none">
      {/* Background Trail Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="forbidden-premium-topo"
              width="180"
              height="140"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M-40 40 Q 30 10, 90 40 T 220 40"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                className="text-red-900"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#forbidden-premium-topo)"
          />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-200/10 rounded-full blur-3xl pointer-events-none" />

      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] font-black text-[24vw] leading-none tracking-tighter text-red-900 select-none z-0">
        403
      </div>

      <Container className="relative z-10 w-full">
        <div className="mx-auto max-w-xl text-center flex flex-col items-center">
          <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-red-100 animate-ping opacity-40 [animation-duration:2.5s]" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-2xl border border-red-100 text-red-600 backdrop-blur-md">
              <ShieldAlert size={38} />
            </div>
          </div>

          <span className="text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 border border-red-100 px-4 py-1.5 rounded-full mb-4">
            Access Restricted
          </span>

          <h1 className="text-4xl font-black tracking-tight text-(--dark) sm:text-5xl leading-[1.1]">
            Area is <span className="text-red-600">Forbidden</span>
          </h1>

          <p className="mt-4 text-base text-gray-500 leading-relaxed max-w-md font-medium">
            Your current security clearance level prevents access to this
            administrative perimeter block.
          </p>

          <div className="mt-10">
            <Link href="/" className="group inline-block">
              <Button
                variant="primary"
                className="inline-flex items-center gap-3 rounded-full px-8 h-14 font-semibold shadow-lg transition-all duration-200 text-base"
              >
                <span>Back to Safety</span>
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
