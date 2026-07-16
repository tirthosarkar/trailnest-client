import Container from '@/components/Ui/Container';
import {
  ShieldCheck,
  MapPinned,
  TentTree,
  BadgeDollarSign,
} from 'lucide-react';

const features = [
  {
    icon: <TentTree size={28} />,
    title: 'Premium Campsites',
    description:
      'Browse hundreds of verified campsites across mountains, forests, lakes, and beaches.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Trusted Booking',
    description:
      'Book confidently with secure reservations and verified outdoor hosts.',
  },
  {
    icon: <BadgeDollarSign size={28} />,
    title: 'Affordable Prices',
    description:
      'Compare listings and choose the best campsite or outdoor gear within your budget.',
  },
  {
    icon: <MapPinned size={28} />,
    title: 'Explore Anywhere',
    description:
      'Find nearby campsites and hidden outdoor destinations with ease.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-16 sm:py-24 relative overflow-hidden">
      <Container>
        {/* Section Heading Panel */}
        <div className="mx-auto mb-16 max-w-2xl text-center flex flex-col items-center">
          <span className="inline-block rounded-full bg-green-50 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-(--primary) uppercase mb-3">
            Our Advantages
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-(--dark) sm:text-4xl md:text-5xl">
            Why Choose <span className="text-(--primary)">TrailNest</span> ?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-(--text-secondary) leading-relaxed">
            Everything you need to plan your next outdoor adventure with
            confidence.
          </p>
        </div>

        {/* Feature Interactive Cards Grid Layout */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map(feature => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-(--primary)/30 hover:shadow-xl hover:bg-gradient-to-b hover:from-white hover:to-green-50/20"
            >
              {/* Icon Container with custom brand ambient glow styling */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-(--primary) transition-all duration-300 group-hover:bg-(--primary) group-hover:text-white group-hover:shadow-lg group-hover:shadow-(--primary)/20">
                {feature.icon}
              </div>

              {/* Feature Content */}
              <h3 className="mb-3 text-lg sm:text-xl font-bold text-(--dark) transition-colors duration-200 group-hover:text-(--primary)">
                {feature.title}
              </h3>

              <p className="text-sm sm:text-base leading-6 sm:leading-7 text-(--text-secondary)">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
