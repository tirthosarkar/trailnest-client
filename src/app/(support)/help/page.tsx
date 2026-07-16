import Container from "@/components/Ui/Container";
import { BookOpen, Key, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function HelpCenterPage() {
  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      items: [
        "Creating an Account",
        "Verifying Your Identity",
        "Profile Setup Guide",
      ],
    },
    {
      icon: Key,
      title: "Account & Access",
      items: [
        "Resetting Passwords",
        "Two-Factor Auth Configuration",
        "Updating User Emails",
      ],
    },
    {
      icon: AlertCircle,
      title: "Troubleshooting",
      items: [
        "Listing Approval Delay",
        "Image Upload Constraints",
        "Location Sync Failure",
      ],
    },
    {
      icon: RefreshCw,
      title: "Refunds & Cancellations",
      items: [
        "Booking Cancellation Policy",
        "Dispute Resolutions",
        "Transaction Discrepancies",
      ],
    },
  ];

  return (
    <div className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold text-(--dark)">
              Knowledge Directory
            </h1>
            <p className="text-gray-500">
              Select a structural group to quickly find diagnostic pathways and
              setup manuals.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="p-6 border border-gray-100 bg-white rounded-2xl shadow-sm space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-(--primary)/10 text-(--primary) rounded-lg flex items-center justify-center">
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-bold text-(--dark)">
                    {cat.title}
                  </h2>
                </div>
                <ul className="space-y-2.5 pt-2">
                  {cat.items.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href="/faqs"
                        className="text-sm text-gray-600 hover:text-(--primary) transition flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
