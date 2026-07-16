// app/settings/SettingsClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Lock,
  Bell,
  Palette,
  ArrowLeft,
  Camera,
  Save,
  Trash2,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";
import Input from "@/components/Ui/Input";
import SectionTitle from "@/components/Ui/SectionTitle";
import { signOut } from "@/lib/auth-client";
import type { UserSession } from "@/lib/core/session";

interface SettingsClientProps {
  user: UserSession;
}

const SettingsClient = ({ user }: SettingsClientProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "preferences" | "notifications"
  >("profile");

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user.name || "",
    email: user.email || "",
    image: user.image || "",
  });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    currency: "USD",
    timezone: "UTC-5",
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    bookingConfirmations: true,
    promotionalEmails: false,
    marketingEmails: false,
    securityAlerts: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle Profile Update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Profile updated successfully!", {
        description: "Your profile information has been updated.",
      });
    } catch (error) {
      toast.error("Failed to update profile", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Password Update
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Password updated successfully!", {
        description: "Your password has been changed.",
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to update password", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Preferences Update
  const handlePreferencesUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Preferences updated successfully!", {
        description: "Your preferences have been saved.",
      });
    } catch (error) {
      toast.error("Failed to update preferences", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Notifications Update
  const handleNotificationsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Notification settings updated!", {
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast.error("Failed to update notification settings", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut({});
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout", {
        description: "Please try again later.",
      });
    }
  };

  // Handle Account Deletion
  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Account deleted successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to delete account", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sidebarItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-(--background) py-12">
      <Container>
        <div className="mb-8 space-y-3">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--primary) transition group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Profile
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-(--dark) tracking-tight">
              Settings
            </h1>
            <p className="mt-1.5 text-(--text-secondary) max-w-2xl">
              Manage your account preferences and settings{" "}
            </p>{" "}
            <span className="text-red-700 text-sm font-semibold">
              !!! Static. Didn&apos;t call API
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={() => setActiveTab(item.id as any)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${
                        activeTab === item.id
                          ? "bg-(--primary)/10 text-(--primary) font-medium"
                          : "text-(--text-secondary) hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-(--dark) mb-6">
                  Profile Settings
                </h2>

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative h-20 w-20">
                      <Image
                        src={
                          profileForm.image ||
                          "https://i.pravatar.cc/150?img=12"
                        }
                        alt={profileForm.name}
                        fill
                        className="rounded-full object-cover ring-4 ring-(--primary)/20"
                      />
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 rounded-full bg-(--primary) p-1.5 text-white shadow-lg hover:bg-(--primary)/90 transition"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium text-(--dark)">
                        {profileForm.name}
                      </p>
                      <p className="text-sm text-(--text-secondary)">
                        {profileForm.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-(--dark) mb-1.5">
                        Full Name
                      </label>
                      <Input
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Your full name"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-(--dark) mb-1.5">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            email: e.target.value,
                          })
                        }
                        placeholder="your@email.com"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-(--dark) mb-6">
                    Change Password
                  </h2>

                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-(--dark) mb-1.5">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              currentPassword: e.target.value,
                            })
                          }
                          placeholder="Enter current password"
                          className={
                            errors.currentPassword ? "border-red-500" : ""
                          }
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.currentPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-(--dark) mb-1.5">
                        New Password
                      </label>
                      <Input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            newPassword: e.target.value,
                          })
                        }
                        placeholder="Enter new password"
                        className={errors.newPassword ? "border-red-500" : ""}
                        disabled={isLoading}
                      />
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-(--dark) mb-1.5">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Confirm new password"
                        className={
                          errors.confirmPassword ? "border-red-500" : ""
                        }
                        disabled={isLoading}
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="flex items-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Update Password
                        </>
                      )}
                    </Button>
                  </form>
                </div>

                {/* Danger Zone */}
                <div className="rounded-2xl bg-red-50 p-6 border border-red-200">
                  <h2 className="text-xl font-bold text-red-600 mb-2">
                    Danger Zone
                  </h2>
                  <p className="text-sm text-red-600/80 mb-4">
                    Permanently delete your account and all associated data.
                  </p>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-500 hover:border-red-500"
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === "preferences" && (
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-(--dark) mb-6">
                  Preferences
                </h2>

                <form onSubmit={handlePreferencesUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-(--dark) mb-1.5">
                        Theme
                      </label>
                      <select
                        value={preferences.theme}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            theme: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
                        disabled={isLoading}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-(--dark) mb-1.5">
                        Language
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            language: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
                        disabled={isLoading}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-(--dark) mb-1.5">
                        Currency
                      </label>
                      <select
                        value={preferences.currency}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            currency: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
                        disabled={isLoading}
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD ($)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-(--dark) mb-1.5">
                        Timezone
                      </label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            timezone: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
                        disabled={isLoading}
                      >
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">GMT (UTC+0)</option>
                        <option value="UTC+1">Central European (UTC+1)</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Preferences
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-(--dark) mb-6">
                  Notification Settings
                </h2>

                <form
                  onSubmit={handleNotificationsUpdate}
                  className="space-y-4"
                >
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                      <div>
                        <p className="font-medium text-(--dark)">
                          Email Updates
                        </p>
                        <p className="text-sm text-(--text-secondary)">
                          Receive updates about new features
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.emailUpdates}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            emailUpdates: e.target.checked,
                          })
                        }
                        className="h-5 w-5 rounded border-gray-300 text-(--primary) focus:ring-(--primary) focus:ring-2"
                        disabled={isLoading}
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                      <div>
                        <p className="font-medium text-(--dark)">
                          Booking Confirmations
                        </p>
                        <p className="text-sm text-(--text-secondary)">
                          Get notified when you book or get booked
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.bookingConfirmations}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            bookingConfirmations: e.target.checked,
                          })
                        }
                        className="h-5 w-5 rounded border-gray-300 text-(--primary) focus:ring-(--primary) focus:ring-2"
                        disabled={isLoading}
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                      <div>
                        <p className="font-medium text-(--dark)">
                          Promotional Emails
                        </p>
                        <p className="text-sm text-(--text-secondary)">
                          Receive special offers and deals
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.promotionalEmails}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            promotionalEmails: e.target.checked,
                          })
                        }
                        className="h-5 w-5 rounded border-gray-300 text-(--primary) focus:ring-(--primary) focus:ring-2"
                        disabled={isLoading}
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                      <div>
                        <p className="font-medium text-(--dark)">
                          Marketing Emails
                        </p>
                        <p className="text-sm text-(--text-secondary)">
                          Get marketing emails and newsletters
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.marketingEmails}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            marketingEmails: e.target.checked,
                          })
                        }
                        className="h-5 w-5 rounded border-gray-300 text-(--primary) focus:ring-(--primary) focus:ring-2"
                        disabled={isLoading}
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                      <div>
                        <p className="font-medium text-(--dark)">
                          Security Alerts
                        </p>
                        <p className="text-sm text-(--text-secondary)">
                          Get notified about security updates
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.securityAlerts}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            securityAlerts: e.target.checked,
                          })
                        }
                        className="h-5 w-5 rounded border-gray-300 text-(--primary) focus:ring-(--primary) focus:ring-2"
                        disabled={isLoading}
                      />
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Notification Settings
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SettingsClient;
