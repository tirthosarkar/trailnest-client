/* eslint-disable prefer-const */
// app/explore/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Grid3x3,
  ChevronLeft,
  ChevronRight,
  Compass,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";
import Input from "@/components/Ui/Input";
import SectionTitle from "@/components/Ui/SectionTitle";
import ListingCard from "@/components/Listing/ListingCard";
import ListingCardSkeleton from "@/components/Listing/ListingCardSkeleton";
import ListingsMap from "@/components/Listing/ListingsMap";
import { serverFetch } from "@/lib/core/server";
import type { ExploreItem, PaginatedResponse } from "@/types/explore";

interface Filters {
  search: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const ExplorePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState<ExploreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [pagination, setPagination] = useState({
    currentPage: parseInt(searchParams.get("page") || "1"),
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get("search") || "",
    type: searchParams.get("type") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minRating: searchParams.get("minRating") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  // Fetch explore items
  const fetchExploreItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string | number> = {
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
      };

      if (debouncedSearch) params.search = debouncedSearch;
      if (filters.type) params.type = filters.type;
      if (filters.minPrice) params.minPrice = parseFloat(filters.minPrice);
      if (filters.maxPrice) params.maxPrice = parseFloat(filters.maxPrice);
      if (filters.minRating) params.minRating = parseFloat(filters.minRating);
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.sortOrder) params.sortOrder = filters.sortOrder;

      const response = await serverFetch<PaginatedResponse<ExploreItem>>(
        "/listing",
        params,
      );

      setItems(response.data);
      setPagination({
        currentPage: response.pagination.currentPage,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
        itemsPerPage: response.pagination.itemsPerPage,
        hasNextPage: response.pagination.hasNextPage,
        hasPrevPage: response.pagination.hasPrevPage,
      });
    } catch (error) {
      console.error("Error fetching explore items:", error);
      toast.error("Failed to load explore items");
    } finally {
      setIsLoading(false);
    }
  }, [
    pagination.currentPage,
    pagination.itemsPerPage,
    debouncedSearch,
    filters.type,
    filters.minPrice,
    filters.maxPrice,
    filters.minRating,
    filters.sortBy,
    filters.sortOrder,
  ]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExploreItems();
  }, [fetchExploreItems]);

  // Update URL with filters and page
  const updateFilters = useCallback(
    (newFilters: Partial<Filters>, page?: number) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);

      const params = new URLSearchParams();
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        }
      });

      const currentPage = page || pagination.currentPage;
      if (currentPage > 1) {
        params.set("page", currentPage.toString());
      }

      router.push(`/explore?${params.toString()}`);
    },
    [filters, pagination.currentPage, router],
  );

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    router.push("/explore");
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    updateFilters({}, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  // Pagination controls
  const renderPagination = () => {
    const {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage,
      hasPrevPage,
    } = pagination;

    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="mt-8 flex flex-col items-center gap-4 border-t border-gray-200 pt-6">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50"
              >
                1
              </button>
              {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
            </>
          )}

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                page === currentPage
                  ? "border-(--primary) bg-(--primary) text-white"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-2 text-gray-400">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-(--text-secondary)">
          Showing {startItem} - {endItem} of {totalItems} results
        </p>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ListingCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-gray-100 p-6">
            <Compass className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-(--dark)">
            No adventures found
          </h3>
          <p className="mt-2 text-(--text-secondary)">
            Try adjusting your search or filters to find what you&apos;re
            looking for.
          </p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      );
    }

    if (viewMode === "map") {
      return (
        <div className="relative h-[600px] w-full rounded-xl overflow-hidden">
          <ListingsMap items={items} />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-white/90 px-4 py-2 text-sm shadow-lg backdrop-blur-sm">
            {pagination.totalItems} adventures found
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <ListingCard key={item._id} listing={item} />
          ))}
        </div>
        {renderPagination()}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-(--background) py-12">
      <Container>
        <SectionTitle
          title="Explore Adventures"
          subtitle="Discover amazing campsites and gear for your next journey"
          center
        />

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search adventures..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value }, 1)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {(filters.type ||
                  filters.minPrice ||
                  filters.maxPrice ||
                  filters.minRating) && (
                  <span className="ml-1 rounded-full bg-(--primary) px-2 py-0.5 text-xs text-white">
                    {
                      [
                        filters.type,
                        filters.minPrice,
                        filters.maxPrice,
                        filters.minRating,
                      ].filter(Boolean).length
                    }
                  </span>
                )}
              </Button>
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition ${
                    viewMode === "grid"
                      ? "bg-(--primary) text-white"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Grid3x3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`p-2 transition ${
                    viewMode === "map"
                      ? "bg-(--primary) text-white"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="text-sm font-medium text-(--dark)">
                    Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => updateFilters({ type: e.target.value }, 1)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-(--primary)"
                  >
                    <option value="">All Types</option>
                    <option value="campsite">🏕️ Campsite</option>
                    <option value="gear">🎒 Gear</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-(--dark)">
                    Min Price
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) =>
                      updateFilters({ minPrice: e.target.value }, 1)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-(--dark)">
                    Max Price
                  </label>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      updateFilters({ maxPrice: e.target.value }, 1)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-(--dark)">
                    Min Rating
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) =>
                      updateFilters({ minRating: e.target.value }, 1)
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-(--primary)"
                  >
                    <option value="">Any Rating</option>
                    <option value="1">1+ ⭐</option>
                    <option value="2">2+ ⭐</option>
                    <option value="3">3+ ⭐</option>
                    <option value="4">4+ ⭐</option>
                    <option value="4.5">4.5+ ⭐</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 pt-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <label className="text-sm font-medium text-(--dark)">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) =>
                        updateFilters({ sortBy: e.target.value }, 1)
                      }
                      className="ml-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-(--primary)"
                    >
                      <option value="createdAt">Date Added</option>
                      <option value="pricePerDay">Price</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-(--dark)">
                      Order
                    </label>
                    <select
                      value={filters.sortOrder}
                      onChange={(e) =>
                        updateFilters(
                          { sortOrder: e.target.value as "asc" | "desc" },
                          1,
                        )
                      }
                      className="ml-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-(--primary)"
                    >
                      <option value="desc">Newest / Highest</option>
                      <option value="asc">Oldest / Lowest</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-(--text-secondary) hover:text-(--primary)"
                >
                  <X className="h-4 w-4" />
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-(--text-secondary)">
              {pagination.totalItems} adventure
              {pagination.totalItems !== 1 ? "s" : ""} found
            </p>
            {viewMode === "grid" && pagination.totalPages > 1 && (
              <p className="text-sm text-(--text-secondary)">
                Page {pagination.currentPage} of {pagination.totalPages}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        {renderContent()}
      </Container>
    </div>
  );
};

export default ExplorePage;
