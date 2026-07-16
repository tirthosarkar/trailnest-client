// types/explore.ts
export interface ExploreItem {
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
  ownerEmail?: string;
  bookingCount?: number;
  rating?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
