// components/Home/CallToAction.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Tent, Users } from "lucide-react";
import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
    },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const CallToAction = () => {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-(--primary) to-(--dark) opacity-90" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-(--secondary)/20 blur-3xl"
      />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          {/* Icon */}
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
          >
            <Tent className="h-10 w-10 text-white" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Ready for Your Next{" "}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-(--secondary)"
            >
              Adventure
            </motion.span>
            <span className="text-white">?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-white/90 max-w-2xl mx-auto"
          >
            Join thousands of adventurers exploring the great outdoors. Whether
            you&apos;re a seasoned camper or just starting out, TrailNest has
            everything you need for an unforgettable experience.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/explore">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="secondary" className="text-lg px-8 py-3">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="outline"
                  className="text-lg px-8 py-3 text-white border-white/30 hover:bg-white/10 hover:border-white"
                >
                  Learn More
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/80"
          >
            <motion.span
              variants={statVariants}
              className="flex items-center gap-2"
            >
              <Users className="h-5 w-5 text-(--secondary)" />
              10,000+ Happy Campers
            </motion.span>
            <span className="hidden h-6 w-px bg-white/20 sm:block" />
            <motion.span
              variants={statVariants}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <Tent className="h-5 w-5 text-(--secondary)" />
              500+ Premium Campsites
            </motion.span>
            <span className="hidden h-6 w-px bg-white/20 sm:block" />
            <motion.span
              variants={statVariants}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="h-5 w-5 text-(--secondary)">★</span>
              4.9/5 Average Rating
            </motion.span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CallToAction;
