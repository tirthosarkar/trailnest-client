import Container from '@/components/Ui/Container';

import Button from '@/components/Ui/Button';

import Input from '@/components/Ui/Input';
import SectionTitle from '@/components/Ui/SectionTitle';
import Hero from '@/components/Home/Hero';

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
    </>
  );
}
