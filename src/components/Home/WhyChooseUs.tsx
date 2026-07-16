// components/Home/WhyChooseUs.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Container from "@/components/Ui/Container";
import {
  ShieldCheck,
  MapPinned,
  TentTree,
  BadgeDollarSign,
  Star,
  Award,
  Compass,
} from "lucide-react";

const features = [
  {
    icon: <TentTree className="h-7 w-7" />,
    title: "Premium Campsites",
    description:
      "Browse hundreds of verified campsites across mountains, forests, lakes, and beaches.",
    // color: "from-[#2d6a4f] to-[#1a2e1a]",
    bgColor: "bg-emerald-50",
    hoverColor: "group-hover:bg-[#2d6a4f]",
  },
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    title: "Trusted Booking",
    description:
      "Book confidently with secure reservations and verified outdoor hosts.",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    hoverColor: "group-hover:bg-[#2d6a4f]",
  },
  {
    icon: <BadgeDollarSign className="h-7 w-7" />,
    title: "Affordable Prices",
    description:
      "Compare listings and choose the best campsite or outdoor gear within your budget.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    hoverColor: "group-hover:bg-[#2d6a4f]",
  },
  {
    icon: <MapPinned className="h-7 w-7" />,
    title: "Explore Anywhere",
    description:
      "Find nearby campsites and hidden outdoor destinations with ease.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    hoverColor: "group-hover:bg-[#2d6a4f]",
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
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

const statVariants: Variants = {
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

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-(--background) py-16 sm:py-24">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-(--primary)/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-(--secondary)/5 blur-3xl"
        />
      </div>

      <Container>
        {/* Section Heading Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block h-1 rounded-full bg-(--primary)"
            />
            <span className="text-xs font-semibold uppercase tracking-[3px] text-(--primary)">
              Why TrailNest
            </span>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block h-1 rounded-full bg-(--primary)"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-(--dark) sm:text-4xl md:text-5xl"
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-(--primary) to-(--secondary) bg-clip-text text-transparent">
              TrailNest
            </span>
            ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-base text-(--text-secondary) sm:text-lg"
          >
            Everything you need to plan your next outdoor adventure with
            confidence.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { number: "500+", label: "Campsites" },
              { number: "4.9★", label: "Average Rating" },
              { number: "10K+", label: "Happy Campers" },
              { number: "50+", label: "Destinations" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={statVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-xl bg-white/50 p-4 backdrop-blur-sm border border-gray-100"
              >
                <motion.p
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-(--primary)"
                >
                  {stat.number}
                </motion.p>
                <p className="text-xs text-(--text-secondary)">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Feature Cards Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:border-(--primary)/20 hover:shadow-xl sm:p-8"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-(--primary)/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon Container */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bgColor} text-(--primary) transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${feature.hoverColor} group-hover:text-white`}
              >
                {feature.icon}
                {/* Subtle glow behind icon */}
                <div className="absolute inset-0 rounded-2xl bg-(--primary)/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>

              {/* Feature Content */}
              <div className="relative">
                <h3 className="mb-3 text-lg font-bold text-(--dark) transition-colors duration-300 group-hover:text-(--primary) sm:text-xl">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-(--text-secondary) sm:text-base">
                  {feature.description}
                </p>

                {/* Decorative Number */}
                <motion.span
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -right-2 -top-2 text-7xl font-bold text-gray-100/50"
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
              </div>

              {/* Bottom Border Animation */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-(--primary) to-(--secondary)"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-white/80 p-6 backdrop-blur-sm border border-gray-100 shadow-sm"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-sm text-(--text-secondary)"
          >
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-(--dark)">
              Trusted by 10,000+
            </span>
            outdoor enthusiasts
          </motion.div>
          <div className="hidden h-6 w-px bg-gray-200 sm:block" />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-sm text-(--text-secondary)"
          >
            <Award className="h-4 w-4 text-(--primary)" />
            <span className="font-medium text-(--dark)">
              Best Outdoor Platform
            </span>
            2024
          </motion.div>
          <div className="hidden h-6 w-px bg-gray-200 sm:block" />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-sm text-(--text-secondary)"
          >
            <Compass className="h-4 w-4 text-(--primary)" />
            <span className="font-medium text-(--dark)">50+</span>
            destinations
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
