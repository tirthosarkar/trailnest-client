'use client';
import { Mail, ArrowRight } from 'lucide-react';
import Container from '@/components/Ui/Container';
import Button from '@/components/Ui/Button';
import Input from '@/components/Ui/Input';

const Newsletter = () => {
  return (
    <section className="bg-white py-12 sm:py-20 relative overflow-hidden">
      <Container>
        {/* Container Panel Shell Card Box Layout */}
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-(--primary) to-(--dark) px-6 py-12 sm:p-16 text-center shadow-2xl">
          {/* Ambient Decorative Graphic Layer: Custom Topography Trails */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="newsletter-topo"
                  width="160"
                  height="120"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M-40 40 Q 20 10, 80 40 T 200 40"
                    stroke="#ffffff"
                    fill="none"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M-40 80 Q 20 50, 80 80 T 200 80"
                    stroke="#ffffff"
                    fill="none"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M-40 0 Q 20 -30, 80 0 T 200 0"
                    stroke="#ffffff"
                    fill="none"
                    strokeWidth="1.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#newsletter-topo)" />
            </svg>
          </div>

          {/* Absolute Background Ambient Glow Spotlights */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-(--secondary)/20 blur-3xl pointer-events-none" />

          {/* Form Header Content Section */}
          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-200 backdrop-blur-md mb-4">
              Join the Community
            </span>

            <h2
              className="text-3xl
             font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              <span className="text-white "></span> Stay Updated
            </h2>

            <p className="mt-4 text-base sm:text-lg text-green-100/90 leading-relaxed">
              Subscribe to our newsletter and receive the latest campsite
              offers, outdoor travel tips, and exclusive deals direct to your
              inbox.
            </p>

            {/* Input Action Form Area */}
            <form
              onSubmit={e => e.preventDefault()}
              className="mx-auto mt-8 flex flex-col gap-3 rounded-2xl bg-white/5 p-2 backdrop-blur-md border border-white/10 sm:flex-row sm:rounded-full max-w-xl shadow-lg"
            >
              <div className="relative flex-1 flex items-center min-w-0">
                <div className="absolute left-4 pointer-events-none text-white/50">
                  <Mail size={18} />
                </div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-transparent border-0 pl-11 pr-4 text-white placeholder-white/50 focus:ring-0 focus-visible:ring-0 h-11"
                />
              </div>

              <Button
                type="submit"
                className="bg-(--secondary) text-white font-semibold rounded-xl sm:rounded-full px-6 py-3 hover:bg-opacity-95 shadow-md flex items-center justify-center gap-2 transition duration-200 group flex-shrink-0 h-11"
              >
                <span>Subscribe</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>
            </form>

            <p className="mt-4 text-xs text-green-200/70">
              🔒 No spam. Unsubscribe anytime with a single click.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
