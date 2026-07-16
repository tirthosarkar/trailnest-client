// types/listing.ts
export interface Listing {
  _id: string;
  name: string;
  description: string;
  image: string;
  images?: string[];
  type: "campsite" | "gear"; // Use literal type
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  capacity: number;
  pricePerDay: number;
  features: string[];
  createdAt: string;
  ownerId?: string;
  ownerEmail?: string;
  bookingCount?: number;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  _id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  _id: string;
  listingId: string;
  userId: string;
  userName: string;
  userEmail: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}
