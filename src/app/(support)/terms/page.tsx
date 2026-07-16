import Container from "@/components/Ui/Container";

export default function TermsPage() {
  return (
    <div className="py-16 bg-white text-gray-700 leading-relaxed">
      <Container>
        <article className="max-w-3xl mx-auto space-y-6 text-sm">
          <h1 className="text-4xl font-extrabold text-(--dark) tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-xs text-gray-400 uppercase font-semibold">
            Last Modified: July 2026
          </p>

          <section className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-(--dark)">
              1. Agreement Definition
            </h2>
            <p>
              By accessing our website and ecosystem engine architectures, you
              explicitly certify complete alignment with these established
              operational procedures and platform compliance guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-(--dark)">
              2. User Restrictions
            </h2>
            <p>
              You agree never to exploit listing queries, scrub active
              databases, inject invalid parameters into data models, or generate
              fraudulent interaction cycles across client components.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-(--dark)">
              3. Liability Standard
            </h2>
            <p>
              All interactions performed outside safe database state records
              fall strictly under individual user discretion. The engine retains
              zero structural liability for physical scheduling processes.
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
}
