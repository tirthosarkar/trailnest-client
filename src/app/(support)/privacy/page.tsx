import Container from "@/components/Ui/Container";

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-white text-gray-700 leading-relaxed">
      <Container>
        <article className="max-w-3xl mx-auto space-y-6 text-sm">
          <h1 className="text-4xl font-extrabold text-(--dark) tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-400 uppercase font-semibold">
            Effective Date: July 13, 2026
          </p>

          <section className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-(--dark)">
              1. Information Aggregation
            </h2>
            <p>
              We process minimal explicit session metrics—consisting primarily
              of account titles, unique string keys, email strings, and optional
              avatars managed cleanly via securely configurations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-(--dark)">
              2. Data Architecture Security
            </h2>
            <p>
              Session tokens are secured using cryptographic standards. Local
              layouts preserve tokens with strict origin bounds to avoid
              traditional cross-site runtime vulnerability vector leaks.
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
}
