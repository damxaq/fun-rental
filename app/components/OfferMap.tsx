"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { Location } from "../create/[id]/address/page";

export function OfferMap({ locationValue }: { locationValue: Location }) {
  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });

  return <LazyMap offerLocation={locationValue} />;
}
