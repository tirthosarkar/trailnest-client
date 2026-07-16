import { redirect } from "next/navigation";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface TestPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function Page({ searchParams }: TestPageProps) {
  // Resolve searchParams promise cleanly in Next.js
  const { status } = await searchParams;

  // 1. Test standard loading state (5 seconds)
  await delay(5000);

  // 2. Test Forbidden Page (403)
  // URL to trigger: /test-route?status=403
  if (status === "403") {
    redirect("/forbidden"); // Throws Next.js internal digest error caught by your forbidden component
  }

  // 3. Test Unauthorized Page (401)
  // URL to trigger: /test-route?status=401
  if (status === "401") {
    redirect("/unauthorized"); // Seamlessly shifts user to the custom passport layout
  }

  return (
    <div className="p-8 font-medium">
      <h1 className="text-xl font-bold mb-4 text-green-600">
        Page Content Loaded Successfully!
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Use URL queries to trigger exception routes:
      </p>

      <div className="flex flex-col gap-2 text-sm max-w-xs">
        <a
          href="?status=403"
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg border border-red-100 hover:bg-red-100 transition"
        >
          Trigger Forbidden (403)
        </a>
        <a
          href="?status=401"
          className="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg border border-amber-100 hover:bg-amber-100 transition"
        >
          Trigger Unauthorized (401)
        </a>
      </div>
    </div>
  );
}
