import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NoItems } from "../components/NoItems";
import { ListingCard } from "../components/ListingCard";
import { getFavorites } from "../queries";

export default async function FavoriteRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getFavorites(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      {data.length === 0 ? (
        <NoItems
          title="Hey, you dont have any favorites"
          description="Please add favorites to see them right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-8 mt-8">
          {data
            .filter((item) => item.Vehicle !== null)
            .map((item: any, index: any) => (
              <ListingCard
                key={index}
                description={item.Vehicle?.description as string}
                location={item.Vehicle?.country as string}
                pathName="/favorites"
                vehicleId={item.Vehicle?.id as string}
                imagePath={item.Vehicle?.photo as string}
                price={item.Vehicle?.price as number}
                userId={user.id}
                favoriteId={item.Vehicle?.Favorite[0].id as string}
                isInFavorites={item.Vehicle?.Favorite.length > 0}
              />
            ))}
        </div>
      )}
    </section>
  );
}
