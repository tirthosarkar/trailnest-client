import Hero from '@/components/Home/Hero';
import WhyChooseUs from '@/components/Home/WhyChooseUs';
import Newsletter from '@/components/Home/Newsletter';

export default function Home() {
  return (
    // <Container className="py-20 space-y-10">
    //   <SectionTitle
    //     title="Welcome to TrailNest"
    //     subtitle="Discover and book amazing campsites and outdoor gear."
    //     center
    //   />

    //   <div className="max-w-md mx-auto space-y-5">
    //     <Input placeholder="Search listings..." />

    //     <div className="flex gap-4 justify-center">
    //       <Button>Explore</Button>

    //       <Button variant="secondary">Register</Button>

    //       <Button variant="outline">Learn More</Button>
    //     </div>
    //   </div>
    // </Container>
    <>
      <Hero />
      <WhyChooseUs />
      <Newsletter />
    </>
  );
}
