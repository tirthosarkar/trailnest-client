// app/settings/page.tsx
import { getUserSession } from "@/lib/core/session";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="min-h-screen bg-(--background) py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-(--dark)">Please Login</h2>
            <p className="mt-2 text-(--text-secondary)">
              You need to be logged in to access settings.
            </p>
            <a
              href="/login"
              className="inline-block mt-4 px-6 py-2 bg-(--primary) text-white rounded-lg hover:bg-(--primary)/90 transition"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <SettingsClient user={user} />;
}
