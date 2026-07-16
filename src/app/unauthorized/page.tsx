import Link from "next/link";
import { KeyRound, MoveRight } from "lucide-react";
import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";

export default function UnauthorizedPage() {
  return (
    <div className="relative min-h-[88vh] w-full flex items-center bg-gradient-to-br from-amber-50/40 via-white to-orange-50/40 overflow-hidden select-none">
      {/* Background Trail Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="unauth-premium-topo"
              width="180"
              height="140"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M-40 40 Q 30 10, 90 40 T 220 40"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                className="text-amber-900"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#unauth-premium-topo)" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />

      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] font-black text-[24vw] leading-none tracking-tighter text-amber-900 select-none z-0">
        401
      </div>

      <Container className="relative z-10 w-full">
        <div className="mx-auto max-w-xl text-center flex flex-col items-center">
          <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-amber-100 animate-pulse opacity-40" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-2xl border border-amber-100 text-amber-600 backdrop-blur-md">
              <KeyRound size={34} />
            </div>
          </div>

          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 border border-amber-100 px-4 py-1.5 rounded-full mb-4">
            Identity Unverified
          </span>

          <h1 className="text-4xl font-black tracking-tight text-(--dark) sm:text-5xl leading-[1.1]">
            Key Token <span className="text-amber-600">Missing</span>
          </h1>

          <p className="mt-4 text-base text-gray-500 leading-relaxed max-w-md font-medium">
            We couldn&apos;t verify your session passport. Please log back in to
            renew your operational security token keys.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/login">
              <Button
                variant="secondary"
                className="rounded-full px-8 h-14 font-semibold text-base w-full sm:w-auto"
              >
                Sign In To Account
              </Button>
            </Link>
            <Link href="/" className="group">
              <Button
                variant="outline"
                className="inline-flex items-center gap-3 rounded-full px-8 h-14 font-semibold text-base bg-white w-full sm:w-auto"
              >
                <span>Return Home</span>
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
