import Container from "@/components/Ui/Container";
import { Eye, ShieldAlert, Lock } from "lucide-react";

export default function SafetyTipsPage() {
  const tips = [
    {
      icon: Lock,
      title: "Secure Communications",
      desc: "Keep conversations and payment workflows explicitly locked inside our verified environment to leverage built-in protection protocols.",
    },
    {
      icon: Eye,
      title: "Inspect In Public",
      desc: "When meeting coordinates are necessary, choose high-visibility public hubs, preferably during daylight hours.",
    },
    {
      icon: ShieldAlert,
      title: "Report Suspicious Activity",
      desc: "If a user requests structural modifications to the transaction or behaves irregularly, trigger the flag option instantly.",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-(--dark)">
              Trust & Safety
            </h1>
            <p className="text-lg text-gray-500">
              Your protection is paramount. Follow these curated practices to
              guarantee clean interactions when handling properties or items.
            </p>
          </div>

          <div className="space-y-4">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50/40"
              >
                <div className="shrink-0 h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <tip.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-(--dark) mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
