// components/Home/FeaturedSection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import FeaturedCarousel from "./FeaturedCarousel";
import { serverFetch } from "@/lib/core/server";

interface FeaturedItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  location: {
    lat: number;
    lng: number;
  };
  capacity: number;
  pricePerDay: number;
  features: string[];
  createdAt: string;
  bookingCount?: number;
  rating?: number;
}

export default function FeaturedSection() {
  const [listings, setListings] = useState<FeaturedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await serverFetch<FeaturedItem[]>("/featured");
        setListings(data || []);
      } catch (error) {
        console.error("Error fetching featured listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-gradient-to-b from-(--background) to-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
              <div className="max-w-2xl">
                <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
                <div className="h-10 w-64 bg-gray-200 rounded mb-2" />
                <div className="h-6 w-48 bg-gray-200 rounded" />
              </div>
              <div className="h-12 w-48 bg-gray-200 rounded-full" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!listings.length) return null;

  return (
    <section className="bg-gradient-to-b from-(--background) to-white py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block h-1.5 rounded-full bg-(--primary)"
              />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-xs font-semibold uppercase tracking-[3px] text-(--primary)"
              >
                Featured Adventures
              </motion.span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-(--dark) md:text-4xl tracking-tight"
            >
              Discover{" "}
              <span className="bg-gradient-to-r from-(--primary) to-(--secondary) bg-clip-text text-transparent">
                Amazing Places
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-2 text-(--text-secondary) md:text-lg"
            >
              Explore the best campsites and gear curated just for you.
            </motion.p>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto self-start md:self-auto"
          >
            <Link
              href="/explore"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-(--primary)/20 bg-white px-6 py-3 text-sm font-medium text-(--primary) transition-all duration-300 hover:border-(--primary) hover:bg-(--primary)/5 hover:shadow-lg active:scale-95 w-full sm:w-auto"
            >
              <span>View All Adventures</span>
              <FaArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={14}
              />
            </Link>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <FeaturedCarousel listings={listings} />
        </motion.div>
      </div>
    </section>
  );
}
