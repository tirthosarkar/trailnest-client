import Container from "@/components/Ui/Container";
import Link from "next/link";
import Button from "@/components/Ui/Button";
import { UserPlus, Search, ShieldCheck } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: UserPlus,
      step: "01",
      title: "Create Your Account",
      desc: "Sign up securely through our system and customize your preferences instantly.",
    },
    {
      icon: Search,
      step: "02",
      title: "Explore & Reserve",
      desc: "Browse authenticated items, listings, or features tailored around your exact location parameters.",
    },
    {
      icon: ShieldCheck,
      step: "03",
      title: "Interact Seamlessly",
      desc: "Connect confidently using verified channels built to guarantee end-to-end satisfaction.",
    },
  ];

  return (
    <div className="py-16 bg-white text-gray-900">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-(--dark)">
              Simple, Safe, Transparent
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Getting started takes minutes. Here is a breakdown of how our
              modular engine coordinates listings and security.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 text-left relative mt-12">
            {steps.map((s, i) => (
              <div
                key={i}
                className="relative p-6 border border-gray-100 bg-white shadow-sm rounded-2xl space-y-4"
              >
                <span className="absolute top-4 right-4 text-3xl font-black text-gray-100 selection:bg-transparent">
                  {s.step}
                </span>
                <div className="h-12 w-12 rounded-xl bg-(--primary)/10 flex items-center justify-center text-(--primary)">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-(--dark)">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <Link href="/register">
              <Button variant="secondary" className="px-8 py-3">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
