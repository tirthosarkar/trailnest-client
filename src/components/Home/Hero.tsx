"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, CalendarDays, Zap, Star } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Container from "@/components/Ui/Container";
import Button from "../Ui/Button";

// Framer Motion Variants for Staggered Children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const Hero = () => {
  return (
    <section className="relative bg-linear-to-br from-green-50/70 via-white to-orange-50/60 overflow-hidden min-h-[70vh] flex items-center">
      {/* 1. ANIMATED AMBIENT BACKGROUND BLOBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-green-200/35 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-orange-200/25 blur-3xl"
        />
      </div>

      {/* 2. DRIFTING TRAIL PATTERN BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none z-0">
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPosition: ["0px 0px", "160px 120px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-40 40 Q 20 10, 80 40 T 200 40' stroke='%23111827' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M-40 80 Q 20 50, 80 80 T 200 80' stroke='%23111827' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M-40 0 Q 20 -30, 80 0 T 200 0' stroke='%23111827' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M-40 120 Q 20 90, 80 120 T 200 120' stroke='%23111827' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E`,
          }}
        />
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid items-center gap-12 py-12 xl:grid-cols-2 xl:py-20 xl:gap-16">
          {/* Left Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center w-full max-w-3xl xl:max-w-none mx-auto xl:mx-0 min-w-0"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-white/80 px-4 py-2 text-sm font-semibold text-(--dark) shadow-xs backdrop-blur-xs">
                <Zap className="w-4 h-4 text-green-500 fill-green-500 animate-pulse" />
                Adventure Starts Here
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 text-4xl font-extrabold leading-[1.15] text-(--dark) sm:text-5xl md:text-6xl xl:text-7xl tracking-tight"
            >
              Explore Nature,
              <br />
              Book Your Perfect
              <span className="relative inline-block sm:ml-3 mt-2 sm:mt-0">
                <span className="relative z-10 text-white px-3">Campsite.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: "circOut" }}
                  className="absolute inset-0 z-0 bg-(--primary) rounded-2xl origin-left scale-105 -rotate-1 shadow-md"
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-8 text-base leading-relaxed text-(--text-secondary) sm:text-lg max-w-xl"
            >
              Discover beautiful campsites, rent premium outdoor gear, and plan
              your next unforgettable adventure with TrailNest. Find your
              perfect spot under the star-lit canopy.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-row gap-4"
            >
              <Link href="/explore">
                <Button
                  variant="primary"
                  className="shadow-lg shadow-(--primary)/20 hover:shadow-xl hover:shadow-(--primary)/30 transition-all duration-300"
                >
                  Explore Listings
                </Button>
              </Link>

              <Link href="/about">
                <Button variant="outline">Learn More</Button>
              </Link>
            </motion.div>

            {/* Partner Section with Mobile Layout Fixes */}
            <motion.div
              variants={itemVariants}
              className="mt-12 border-t border-gray-100 pt-8 w-full max-w-xl overflow-hidden min-w-0"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-5">
                Trusted by partners at:
              </p>

              {/* Mask layer creates smooth fade-out edges on left/right sides */}
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                <motion.div
                  className="flex gap-12 items-center w-max pr-12"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    ease: "linear",
                    duration: 25,
                    repeat: Infinity,
                  }}
                >
                  {/* Duplicate the logo array once inside to ensure seamless infinite looping */}
                  {[...Array(2)].map((_, setIdx) => (
                    <div
                      key={setIdx}
                      className="flex items-center gap-12 text-gray-400 dark:text-gray-500 shrink-0"
                    >
                      {/* Logo 1: Yosemite / National Parks Inspired */}
                      <div className="flex items-center gap-2 tracking-widest text-xs font-bold hover:text-gray-600 transition-colors duration-200">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M12 2L2 22h20L12 2z"
                            strokeLinejoin="round"
                          />
                          <path d="M12 9l-4 8h8l-4-8z" strokeLinejoin="round" />
                        </svg>
                        <span>YOSEMITE PK</span>
                      </div>

                      {/* Logo 2: Redwoods / Timber Estate Inspired */}
                      <div className="flex items-center gap-2 tracking-widest text-xs font-bold hover:text-gray-600 transition-colors duration-200">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M12 3v18M8 7l4-4 4 4M6 13l6-5 6 5M4 18l8-6 8 6"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>REDWOODS</span>
                      </div>

                      {/* Logo 3: Outdoor Co / Gear Supplier Inspired */}
                      <div className="flex items-center gap-2 tracking-widest text-xs font-bold hover:text-gray-600 transition-colors duration-200">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M8 12h8M12 8v8" strokeLinecap="round" />
                        </svg>
                        <span>OUTDOOR CO.</span>
                      </div>

                      {/* Logo 4: TrailNest Wild / Basecamp Network */}
                      <div className="flex items-center gap-2 tracking-widest text-xs font-bold hover:text-gray-600 transition-colors duration-200">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M3 20h18L12 4 3 20z"
                            strokeLinejoin="round"
                          />
                          <path d="M12 4v16" />
                        </svg>
                        <span>PACIFIC RIDGE</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Layout Image Mosaic Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl mx-auto xl:max-w-none h-[420px] sm:h-[480px] md:h-[520px] xl:h-[560px]"
          >
            {/* Main Application Mock Container */}
            <div className="relative w-full h-full flex flex-col rounded-3xl border border-gray-100 bg-white/70 p-4 shadow-2xl backdrop-blur-md">
              {/* Browser Header */}
              <div className="flex items-center gap-1.5 pb-4 px-1 border-b border-gray-100/80 mb-4 flex-shrink-0">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-400 hover:bg-rose-500 transition-colors cursor-pointer"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 hover:bg-amber-500 transition-colors cursor-pointer"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 hover:bg-emerald-500 transition-colors cursor-pointer"></div>
              </div>

              {/* Grid Dashboard Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-4 flex-1 min-h-0 overflow-hidden">
                {/* Left Large Column */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-md min-h-[180px] sm:min-h-0"
                >
                  <Image
                    src="/hero01.jpg"
                    alt="Main camping destination experience view"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 30vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Floating Action Filter Widget inside Image Frame */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between rounded-xl border border-white/20 bg-white/95 p-2 shadow-lg backdrop-blur-md text-[11px] font-medium">
                    <div className="flex items-center gap-1 text-gray-500 border-r border-gray-100 pr-1.5 flex-1 justify-center">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>Location</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 border-r border-gray-100 px-1.5 flex-1 justify-center">
                      <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
                      <span>Dates</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-(--dark) pl-1.5 flex-1 justify-center">
                      <Search className="w-3.5 h-3.5 text-(--primary)" />
                      <span>Search</span>
                    </div>
                  </div>
                </motion.div>

                {/* Vertical Stack Right Column */}
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 h-full">
                  {/* Sub-image Item 01 */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl overflow-hidden shadow-xs aspect-square sm:aspect-auto"
                  >
                    <Image
                      src="/hero02.jpg"
                      alt="Gathering experience around campfire"
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 15vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </motion.div>
                  {/* Sub-image Item 02 */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl overflow-hidden shadow-xs aspect-square sm:aspect-auto"
                  >
                    <Image
                      src="/hero03.jpg"
                      alt="Essential outdoor camping equipment selection"
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 15vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Overlapping Absolute Review Badge Component */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex absolute -bottom-5 right-8 items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-xl border border-gray-100"
            >
              <span className="text-xs font-bold text-(--dark)">
                Popular Rating
              </span>
              <div className="flex items-center gap-0.5 border-l border-gray-150 pl-3">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
