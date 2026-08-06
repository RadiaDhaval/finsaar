import { Skeleton } from "@/components/ui/Skeleton";

export default function HomeServicesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-sand/40 p-8 flex flex-col items-start w-full bg-white shadow-sm"
        >
          {/* Icon Skeleton */}
          <Skeleton className="w-12 h-12 rounded-xl mb-5" />
          
          {/* Title Skeleton */}
          <Skeleton className="h-6 w-3/4 mb-3" />
          
          {/* Description Skeletons */}
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-6" />
          
          {/* Link Skeleton */}
          <Skeleton className="h-4 w-1/3 mt-auto" />
        </div>
      ))}
    </div>
  );
}
