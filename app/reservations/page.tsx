import { NoItems } from "../components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ReservationCard } from "../components/ReservationCard";
import { daysBetween, formatDaysRange } from "../lib/dateFormat";
import { getReservations } from "../queries";

export default async function ReservationsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getReservations(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10 mb-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {data.length === 0 ? (
        <NoItems
          title="Hey, you dont have any reservations"
          description="Find something you like and book it"
        />
      ) : (
        <div className="mt-8">
          {data
            .filter((item) => item.Vehicle !== null)
            .reverse()
            .map((item: any, index: number) => (
              <ReservationCard
                key={index}
                title={item.Vehicle.title}
                imagePath={item.Vehicle?.photo as string}
                userId={user.id}
                isInFavorites={item.Vehicle?.Favorite.length > 0}
                dates={formatDaysRange(item.startDate, item.endDate)}
                totalPrice={
                  daysBetween(item.startDate, item.endDate) *
                  item.Vehicle?.price
                }
                status={item.status}
                person={
                  item.Vehicle.User.firstName + " " + item.Vehicle.User.lastName
                }
                url={`/reservation/${item.id}`}
              />
            ))}
        </div>
      )}
    </section>
  );
}
