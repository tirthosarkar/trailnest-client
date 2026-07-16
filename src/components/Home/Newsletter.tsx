// components/Home/Newsletter.tsx
"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";
import Input from "@/components/Ui/Input";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const formVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: "easeOut" as const,
    },
  },
};

const successVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);
      toast.success("🎉 Subscribed successfully!", {
        description: "Thank you for joining our community!",
      });
      setEmail("");

      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-(--background) py-16 sm:py-24">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-(--primary)/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-(--secondary)/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-(--primary)/5 blur-3xl"
        />
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-(--primary) to-(--dark) px-6 py-12 shadow-2xl sm:p-16"
        >
          {/* Decorative Topography Pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="newsletter-topo"
                  width="160"
                  height="120"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M-40 40 Q 20 10, 80 40 T 200 40"
                    stroke="#ffffff"
                    fill="none"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M-40 80 Q 20 50, 80 80 T 200 80"
                    stroke="#ffffff"
                    fill="none"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M-40 0 Q 20 -30, 80 0 T 200 0"
                    stroke="#ffffff"
                    fill="none"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M-40 120 Q 20 90, 80 120 T 200 120"
                    stroke="#ffffff"
                    fill="none"
                    strokeWidth="1.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#newsletter-topo)" />
            </svg>
          </div>

          {/* Glow Spotlights */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-(--secondary)/20 blur-3xl pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl pointer-events-none"
          />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            {/* Badge */}
            <motion.div
              variants={badgeVariants}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="inline-block h-1 rounded-full bg-white/50"
              />
              <span className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">
                Join the Community
              </span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="inline-block h-1 rounded-full bg-white/50"
              />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Stay <span className="text-(--secondary)">Updated</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-4 text-base text-white/90 sm:text-lg"
            >
              Subscribe to our newsletter and receive the latest campsite
              offers, outdoor travel tips, and exclusive deals direct to your
              inbox.
            </motion.p>

            {/* Success Message */}
            <AnimatePresence mode="wait">
              {isSuccess && (
                <motion.div
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-green-500/20 px-4 py-3 text-white backdrop-blur-sm border border-green-500/30"
                >
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="font-medium">Successfully subscribed!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <motion.form
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex flex-col gap-3 rounded-2xl bg-white/5 p-2 backdrop-blur-md border border-white/10 sm:flex-row sm:rounded-full shadow-lg"
            >
              <div className="relative flex-1 flex items-center min-w-0">
                <div className="absolute left-4 pointer-events-none text-white/50">
                  <Mail className="h-5 w-5 text-[#2d6a4f]" />
                </div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || isSuccess}
                  required
                  className="w-full bg-transparent border-0 pl-11 pr-4 text-white placeholder-white/50 focus:ring-0 focus-visible:ring-0 h-12 text-base disabled:opacity-50 rounded-xl sm:rounded-full"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="bg-(--secondary) text-white font-semibold rounded-xl sm:rounded-full px-6 py-3 hover:bg-(--secondary)/90 shadow-md flex items-center justify-center gap-2 transition-all duration-300 group flex-shrink-0 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
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
                      <span>Subscribing...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>

            {/* Trust Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/60"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                No spam. Ever.
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                Unsubscribe anytime
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                Weekly updates
              </span>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Newsletter;
