// components/Listing/ListingCardSkeleton.tsx
const ListingCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse">
      <div className="h-48 w-full rounded-t-xl bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-5 w-1/4 rounded bg-gray-200" />
        </div>
        <div className="h-10 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

export default ListingCardSkeleton;
