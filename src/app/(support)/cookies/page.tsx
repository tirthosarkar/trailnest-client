import Container from "@/components/Ui/Container";

export default function CookiePolicyPage() {
  return (
    <div className="py-16 bg-white text-gray-700 leading-relaxed">
      <Container>
        <article className="max-w-3xl mx-auto space-y-6 text-sm">
          <h1 className="text-4xl font-extrabold text-(--dark) tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-xs text-gray-400 uppercase font-semibold">
            Updated: 2026
          </p>

          <p>
            Our core website relies exclusively on technical cookies required to
            safely pass context records, verify your server tokens, and ensure
            design settings look completely uniform across layout rendering
            loops.
          </p>

          <table className="w-full text-left border-collapse border border-gray-100 mt-6 text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-3 font-semibold text-gray-700">Name</th>
                <th className="p-3 font-semibold text-gray-700">
                  Classification
                </th>
                <th className="p-3 font-semibold text-gray-700">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50">
                <td className="p-3 font-mono text-(--primary)">
                  __session_token
                </td>
                <td className="p-3 text-gray-600">
                  Strictly Necessary (Auth Context)
                </td>
                <td className="p-3 text-gray-500">Session Lifecycle</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-(--primary)">
                  _theme_layout
                </td>
                <td className="p-3 text-gray-600">Preference Optimization</td>
                <td className="p-3 text-gray-500">1 Year</td>
              </tr>
            </tbody>
          </table>
        </article>
      </Container>
    </div>
  );
}
