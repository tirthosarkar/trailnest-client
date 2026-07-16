import Hero from "@/components/Home/Hero";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Newsletter from "@/components/Home/Newsletter";
import FeaturedSection from "@/components/Home/FeaturedSection";
import Testimonials from "@/components/Home/Testimonials";
import CallToAction from "@/components/Home/CallToAction";
import FAQ from "@/components/Home/FAQ";
import Services from "@/components/Home/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <Newsletter />
    </>
  );
}
