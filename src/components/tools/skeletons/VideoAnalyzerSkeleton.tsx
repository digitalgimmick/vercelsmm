import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function VideoAnalyzerSkeleton() {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-6">
      {/* Video Preview Card Skeleton */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[360px] flex-shrink-0">
            <Skeleton className="w-full aspect-video rounded-lg" />
          </div>
          <div className="flex-grow space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Stats Skeleton */}
      <Card className="mt-6 p-6 bg-white/80 backdrop-blur-sm">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-5 w-36" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton className="h-5 w-36" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
