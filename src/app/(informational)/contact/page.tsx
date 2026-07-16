import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-16 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl font-extrabold text-(--dark)">
              Get In Touch
            </h1>
            <p className="text-gray-500">
              Have questions regarding specific features, bugs, or business
              alignment? Message us directly.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>support@greenearth.domain</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>+880 1234 567890</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span>Bogura, Rajshahi Division, Bangladesh</span>
              </div>
            </div>
          </div>

          <form className="lg:col-span-3 space-y-4 p-6 border border-gray-100 rounded-2xl bg-gray-50/50">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-(--primary)"
                  placeholder="Shahadat"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-gray-500">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-(--primary)"
                  placeholder="name@email.com"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-gray-500">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-(--primary)"
                placeholder="Listing Inquiry"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-gray-500">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-(--primary) resize-none"
                placeholder="Write your message here..."
              />
            </div>
            <Button
              variant="secondary"
              className="w-full justify-center py-2.5"
            >
              Send Message
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
