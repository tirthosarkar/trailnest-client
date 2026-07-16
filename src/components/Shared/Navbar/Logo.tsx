// components/Navbar/Logo.tsx
import Link from 'next/link';

interface LogoProps {
  isScrolled?: boolean;
}

const Logo = ({ isScrolled = false }: LogoProps) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group focus:outline-none rounded-lg p-1"
      aria-label="TrailNest - Home"
    >
      {/* Logo Icon */}
      <div
        className={`flex items-center justify-center rounded-full bg-(--primary) font-bold text-white transition-all duration-300 ${
          isScrolled ? 'h-8 w-8 text-sm' : 'h-10 w-10 text-lg'
        }`}
      >
        <svg
          className={`transition-all duration-300 ${
            isScrolled ? 'h-4 w-4' : 'h-5 w-5'
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
          <path d="M2 17l10 5 10-5" />
        </svg>
      </div>

      {/* Logo Text */}
      <div className="leading-none">
        <h1
          className={`font-extrabold text-(--dark) transition-all duration-300 ${
            isScrolled ? 'text-xl' : 'text-2xl'
          }`}
        >
          Trail<span className="text-(--primary)">Nest</span>
        </h1>
        <p
          className={`hidden text-xs text-gray-500 transition-all duration-300 sm:block ${
            isScrolled ? 'opacity-0 max-h-0' : 'opacity-100 max-h-4'
          }`}
        >
          Explore Beyond Limits
        </p>
      </div>
    </Link>
  );
};

export default Logo;
