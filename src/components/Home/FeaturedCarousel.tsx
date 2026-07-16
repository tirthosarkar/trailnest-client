// components/Home/FeaturedCarousel.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ListingCard from "@/components/Listing/ListingCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

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

interface FeaturedCarouselProps {
  listings: FeaturedItem[];
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const FeaturedCarousel = ({ listings }: FeaturedCarouselProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      <style jsx global>{`
        .featured-swiper-wrapper {
          position: relative;
          width: 100%;
        }

        .featured-swiper {
          padding: 24px 4px 42px;
          margin-top: -14px;
        }

        .featured-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .featured-swiper .swiper-slide {
          display: flex;
          height: auto;
        }

        .featured-swiper .swiper-slide > div {
          width: 100%;
          height: 100%;
        }

        .featured-card-wrapper {
          width: 100%;
          height: 100%;
          will-change: transform, box-shadow;
          transition:
            transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
            box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .featured-card-wrapper:hover {
          transform: translateY(-8px);
          box-shadow: 0 22px 40px -10px rgba(0, 0, 0, 0.14);
        }

        .featured-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .featured-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          opacity: 0.6;
          transition: all 0.3s ease;
          margin: 0 5px !important;
        }

        .featured-swiper .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 999px;
          background: var(--primary);
          opacity: 1;
        }

        .custom-nav-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(45, 106, 79, 0.2);
          background: white;
          color: var(--primary);
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .custom-nav-button:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(45, 106, 79, 0.3);
          transform: scale(1.05);
        }

        .custom-nav-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none;
        }

        .custom-nav-button:disabled:hover {
          background: white;
          color: var(--primary);
          border-color: rgba(45, 106, 79, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transform: none;
        }
      `}</style>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="featured-swiper-wrapper"
      >
        {/* Navigation Buttons */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute right-0 z-10 flex items-center gap-2 -top-8"
        >
          <motion.button
            ref={prevRef}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="custom-nav-button"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            ref={nextRef}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="custom-nav-button"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </motion.div>

        <Swiper
          className="featured-swiper"
          modules={[Navigation, Pagination, Autoplay, A11y]}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={900}
          grabCursor
          loop={listings.length > 3}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 28,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          a11y={{
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            paginationBulletMessage: "Go to slide {{index}}",
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== "boolean") {
              const navigation = swiper.params.navigation;
              if (navigation) {
                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
              }
            }
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setTimeout(() => {
              swiper.navigation?.update();
            });
          }}
        >
          {listings.map((listing, index) => (
            <SwiperSlide key={listing._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: Math.min(index * 0.1, 0.5),
                  ease: "easeOut" as const,
                }}
                viewport={{ once: true }}
                className="featured-card-wrapper"
              >
                <ListingCard listing={listing} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </>
  );
};

export default FeaturedCarousel;
