import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NoItems } from "../components/NoItems";
import { ListingCard } from "../components/ListingCard";
import { getOwnedVehicles } from "../queries";

export default async function MyOffers() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getOwnedVehicles(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10 mb-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Offers</h2>

      {data.length === 0 ? (
        <NoItems
          title="You dont have any offers listed"
          description="Please list your offer on Fun Rental so that you can see it right here"
        />
      ) : (
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-8 mt-8">
          {data.map((item: any) => (
            <ListingCard
              key={item.id}
              imagePath={item.photo as string}
              vehicleId={item.id}
              price={item.price as number}
              description={item.description as string}
              location={`${item.city} / ${item.country}`}
              userId={user.id}
              pathName="/my-offers"
              favoriteId={item.Favorite[0]?.id}
              isInFavorites={item.Favorite.length > 0}
            />
          ))}
        </div>
      )}
    </section>
  );
}
