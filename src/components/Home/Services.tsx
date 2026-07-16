// components/Home/Services.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Compass, Tent, Users, Shield, Clock, Award } from "lucide-react";
import Container from "@/components/Ui/Container";

const services = [
  {
    icon: <Compass className="h-6 w-6" />,
    title: "Curated Adventures",
    description:
      "Handpicked campsites and outdoor experiences verified by our team.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure Bookings",
    description: "Your payments and personal information are always protected.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: <Tent className="h-6 w-6" />,
    title: "Premium Campsites",
    description:
      "Access to the best campsites with stunning views and amenities.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Driven",
    description: "Connect with fellow adventurers and share your experiences.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Support",
    description: "Our team is always ready to help you with any questions.",
    color: "from-rose-500 to-red-500",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Best Price Guarantee",
    description: "Find a better price? We'll match it and give you 10% off.",
    color: "from-cyan-500 to-blue-500",
  },
];

// Animation variants with proper types
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const Services = () => {
  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <Container>
        {/* Header - Now matching WhyChooseUs style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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
              Our Services
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
            What We{" "}
            <span className="bg-linear-to-r from-(--primary) to-(--secondary) bg-clip-text text-transparent">
              Offer
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-base text-(--text-secondary) sm:text-lg"
          >
            Everything you need for the perfect outdoor adventure
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-(--primary)/20 hover:shadow-lg"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-linear-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-(--primary)/10 text-(--primary) transition group-hover:bg-(--primary) group-hover:text-white"
              >
                {service.icon}
              </motion.div>

              {/* Content */}
              <h3 className="relative text-lg font-bold text-(--dark) group-hover:text-(--primary) transition">
                {service.title}
              </h3>
              <p className="relative mt-2 text-sm text-(--text-secondary) leading-relaxed">
                {service.description}
              </p>

              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4 }}
                className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r ${service.color}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Services;
