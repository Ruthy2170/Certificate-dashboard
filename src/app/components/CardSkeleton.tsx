import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
    return (
        <div className="rounded-xl border-2 border-gray-250 p-6">
            <Skeleton className="mb-4 h-14 w-14 rounded-xl bg-gray-300" />
            <Skeleton className="mb-2 h-5 w-3/4 bg-gray-300" />
            <Skeleton className="mb-2 h-4 w-1/2 bg-gray-300" />
            <Skeleton className="mb-2 h-4 w-1/2 bg-gray-300" />
            <Skeleton className="mb-6 h-4 w-1/3 bg-gray-300" />
            <Skeleton className="mb-3 h-11 w-full rounded-lg bg-gray-300" />
            <Skeleton className="h-11 w-full rounded-lg bg-gray-300" />
        </div>
    );
}
