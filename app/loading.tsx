import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full gap-12">
      {/* Hero Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
        <div className="space-y-6">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-16 w-full max-w-md" />
          <Skeleton className="h-16 w-3/4 max-w-sm" />
          <Skeleton className="h-6 w-full max-w-lg mt-6" />
          <Skeleton className="h-6 w-5/6 max-w-md" />
          <div className="flex gap-4 mt-8">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
          </div>
        </div>
        <div className="hidden lg:block">
          <Skeleton className="w-full aspect-square rounded-3xl" />
        </div>
      </div>
      
      {/* Services Skeleton area */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
