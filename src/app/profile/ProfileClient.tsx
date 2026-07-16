// app/profile/ProfileClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Tent,
  Wrench,
  Star,
  Heart,
  Settings,
  LogOut,
  Camera,
  Plus,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Package,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";
import SectionTitle from "@/components/Ui/SectionTitle";
import type { UserSession } from "@/lib/core/session";

interface Booking {
  _id: string;
  listingId: string;
  listing?: {
    _id: string;
    name: string;
    image: string;
    type: string;
    pricePerDay: number;
  };
  startDate: string;
  endDate: string;
  guests: number;
  totalPrice: number;
  status: "confirmed" | "cancelled" | "pending";
  createdAt: string;
}

interface Listing {
  _id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  pricePerDay: number;
  bookingCount: number;
  createdAt: string;
}

interface ProfileClientProps {
  user: UserSession;
  bookings: Booking[];
  listings: Listing[];
  error: string | null;
}

// Colors for charts
const COLORS = ["#2d6a4f", "#e07a3f", "#5f6b66", "#1a2e1a", "#8b9d8b"];

const ProfileClient = ({
  user,
  bookings,
  listings,
  error,
}: ProfileClientProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "overview" | "listings" | "bookings"
  >("overview");
  const [isLoading, setIsLoading] = useState(false);

  // Prepare chart data
  const bookingStatusData = [
    {
      name: "Confirmed",
      value: bookings.filter((b) => b.status === "confirmed").length,
    },
    {
      name: "Cancelled",
      value: bookings.filter((b) => b.status === "cancelled").length,
    },
    {
      name: "Pending",
      value: bookings.filter((b) => b.status === "pending").length,
    },
  ];

  // Monthly bookings data
  const monthlyBookings = bookings
    .filter((b) => b.status === "confirmed")
    .reduce(
      (
        acc: { month: string; bookings: number; revenue: number }[],
        booking,
      ) => {
        const month = format(new Date(booking.createdAt), "MMM");
        const existing = acc.find((item) => item.month === month);
        if (existing) {
          existing.bookings += 1;
          existing.revenue += booking.totalPrice;
        } else {
          acc.push({ month, bookings: 1, revenue: booking.totalPrice });
        }
        return acc;
      },
      [],
    )
    .slice(-6);

  // Listing type distribution
  const listingTypeData = [
    {
      name: "Campsites",
      value: listings.filter((l) => l.type === "campsite").length,
    },
    { name: "Gear", value: listings.filter((l) => l.type === "gear").length },
  ];

  // Total revenue
  const totalRevenue = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  // Average booking value
  const avgBookingValue =
    bookings.filter((b) => b.status === "confirmed").length > 0
      ? totalRevenue / bookings.filter((b) => b.status === "confirmed").length
      : 0;

  // Success rate
  const successRate =
    bookings.length > 0
      ? (bookings.filter((b) => b.status === "confirmed").length /
          bookings.length) *
        100
      : 0;

  // Redirect handlers
  const goToMyListings = () => {
    router.push("/my-listings");
  };

  const goToMyBookings = () => {
    router.push("/my-bookings");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-(--background) py-12">
        <Container>
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-(--dark)">
              Something went wrong
            </h2>
            <p className="mt-2 text-(--text-secondary)">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-(--primary) text-white rounded-lg hover:bg-(--primary)/90 transition"
            >
              Try Again
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--background) py-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              {/* Profile Card */}
              <div className="text-center">
                <div className="relative mx-auto h-24 w-24">
                  <Image
                    src={user.image || "https://i.pravatar.cc/150?img=12"}
                    alt={user.name || "User"}
                    fill
                    className="rounded-full object-cover ring-4 ring-(--primary)/20"
                  />
                  <button className="absolute bottom-0 right-0 rounded-full bg-(--primary) p-1.5 text-white shadow-lg hover:bg-(--primary)/90 transition">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-bold text-(--dark)">
                  {user.name || "User"}
                </h2>
                <p className="text-sm text-(--text-secondary)">{user.email}</p>
                <div className="mt-3 flex justify-center gap-4 text-sm">
                  <div>
                    <p className="font-bold text-(--dark)">{listings.length}</p>
                    <p className="text-xs text-(--text-secondary)">Listings</p>
                  </div>
                  <div>
                    <p className="font-bold text-(--dark)">{bookings.length}</p>
                    <p className="text-xs text-(--text-secondary)">Bookings</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="mt-6 border-t border-gray-100 pt-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${
                        activeTab === "overview"
                          ? "bg-(--primary)/10 text-(--primary) font-medium"
                          : "text-(--text-secondary) hover:bg-gray-50"
                      }`}
                    >
                      <TrendingUp className="h-4 w-4" />
                      Overview
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("listings")}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${
                        activeTab === "listings"
                          ? "bg-(--primary)/10 text-(--primary) font-medium"
                          : "text-(--text-secondary) hover:bg-gray-50"
                      }`}
                    >
                      <Tent className="h-4 w-4" />
                      My Listings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("bookings")}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${
                        activeTab === "bookings"
                          ? "bg-(--primary)/10 text-(--primary) font-medium"
                          : "text-(--text-secondary) hover:bg-gray-50"
                      }`}
                    >
                      <Calendar className="h-4 w-4" />
                      My Bookings
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-(--text-secondary)">
                      Total Spending
                    </p>
                    <p className="text-2xl font-bold text-(--primary)">
                      ${totalRevenue.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-(--text-secondary)">
                      Avg. Booking Value
                    </p>
                    <p className="text-2xl font-bold text-(--dark)">
                      ${avgBookingValue.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-(--text-secondary)">
                      Success Rate
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {successRate.toFixed(1)}%
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-(--text-secondary)">
                      Total Bookings
                    </p>
                    <p className="text-2xl font-bold text-(--dark)">
                      {bookings.length}
                    </p>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Booking Status Pie Chart */}
                  <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-(--dark) mb-4">
                      Booking Status
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={bookingStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {bookingStatusData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Monthly Bookings Bar Chart */}
                  <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-(--dark) mb-4">
                      Monthly Bookings
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyBookings}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="bookings" fill="#2d6a4f" />
                          <Bar dataKey="revenue" fill="#e07a3f" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Listing Type Pie Chart */}
                  <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-(--dark) mb-4">
                      Listing Distribution
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={listingTypeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {listingTypeData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Revenue Trend */}
                  <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-(--dark) mb-4">
                      Revenue Trend
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyBookings}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#2d6a4f"
                            fill="#2d6a4f"
                            fillOpacity={0.2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    onClick={goToMyListings}
                    className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-(--primary)/20 transition group"
                  >
                    <div>
                      <p className="font-semibold text-(--dark)">My Listings</p>
                      <p className="text-sm text-(--text-secondary)">
                        View and manage all your listings
                      </p>
                    </div>
                    <Eye className="h-6 w-6 text-(--primary) group-hover:translate-x-1 transition" />
                  </button>
                  <button
                    onClick={goToMyBookings}
                    className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-(--primary)/20 transition group"
                  >
                    <div>
                      <p className="font-semibold text-(--dark)">My Bookings</p>
                      <p className="text-sm text-(--text-secondary)">
                        View and manage all your bookings
                      </p>
                    </div>
                    <Calendar className="h-6 w-6 text-(--primary) group-hover:translate-x-1 transition" />
                  </button>
                </div>

                {/* Recent Activity */}
                <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-(--dark) mb-4">
                    Recent Activity
                  </h3>
                  {bookings.length === 0 ? (
                    <p className="text-(--text-secondary) text-center py-8">
                      No recent activity
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 5).map((booking) => (
                        <div
                          key={booking._id}
                          className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium text-(--dark)">
                              {booking.listing?.name || "Unknown Listing"}
                            </p>
                            <p className="text-sm text-(--text-secondary)">
                              {format(
                                new Date(booking.createdAt),
                                "MMM d, yyyy",
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-(--primary)">
                              ${booking.totalPrice}
                            </p>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : booking.status === "cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Listings Tab - Redirect to /my-listings */}
            {activeTab === "listings" && (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <div className="mx-auto rounded-full bg-(--primary)/10 p-6 w-fit">
                  <Tent className="h-16 w-16 text-(--primary)" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-(--dark)">
                  My Listings
                </h3>
                <p className="mt-2 text-(--text-secondary)">
                  Go to your listings dashboard to view and manage all your
                  listings.
                </p>
                <Button
                  variant="primary"
                  className="mt-6"
                  onClick={goToMyListings}
                >
                  Go to My Listings
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Bookings Tab - Redirect to /my-bookings */}
            {activeTab === "bookings" && (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <div className="mx-auto rounded-full bg-(--primary)/10 p-6 w-fit">
                  <Calendar className="h-16 w-16 text-(--primary)" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-(--dark)">
                  My Bookings
                </h3>
                <p className="mt-2 text-(--text-secondary)">
                  Go to your bookings dashboard to view and manage all your
                  bookings.
                </p>
                <Button
                  variant="primary"
                  className="mt-6"
                  onClick={goToMyBookings}
                >
                  Go to My Bookings
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfileClient;
