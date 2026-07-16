import Container from "@/components/Ui/Container";

export default function FAQsPage() {
  const items = [
    {
      q: "Is there an explicit cost to upload listings?",
      a: "Standard account profiles enjoy basic tier listings entirely free of charge. Premium exposures or automated sync options might incur structural micro-fees.",
    },
    {
      q: "How do I ensure the accuracy of listing statuses?",
      a: "Users can switch an active asset toggler down into 'Archived' mode straight from their personal management terminal interface.",
    },
    {
      q: "What security measures evaluate registered emails?",
      a: "We coordinate with BetterAuth structures passing secure secure hashes alongside real-time domain verification validation steps.",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto space-y-10">
          <h1 className="text-4xl font-extrabold text-center text-(--dark) mb-8">
            Frequently Asked Questions
          </h1>
          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className="border-b border-gray-100 pb-5 space-y-2">
                <h3 className="text-base font-bold text-(--dark)">{item.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
