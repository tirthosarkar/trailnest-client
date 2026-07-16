import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-(--primary) focus:ring-offset-2 rounded-lg p-1"
      aria-label="TrailNest - Home"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary) text-lg font-bold text-white transition-transform group-hover:scale-105">
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" />
        </svg>
      </div>
      <div className="leading-none">
        <h1 className="text-2xl font-extrabold text-(--dark)">
          Trail<span className="text-(--primary)">Nest</span>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
