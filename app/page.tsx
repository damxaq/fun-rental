import { Suspense } from "react";
import { ListingCard } from "./components/ListingCard";
import { MapFilterItems } from "./components/MapFilterItems";
import { SkeletonCard } from "./components/SkeletonCard";
import { NoItems } from "./components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getVehicles } from "./queries";

export default async function Vehicle({
  searchParams,
}: {
  searchParams?: Promise<{
    filter?: string;
    country?: string;
    guest?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <Suspense key={params?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={params} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getVehicles(user?.id, searchParams);

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          title="Sorry, no listings found for this category..."
          description="Please check other category or create your own listing!"
        />
      ) : (
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8 mt-8 mb-20">
          {data.map((item: any) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={`${item.city} / ${item.country}`}
              price={item.price as number}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavorites={item.Favorite.length > 0}
              vehicleId={item.id}
              pathName={"/"}
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
