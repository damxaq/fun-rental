import { NoItems } from "../components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { daysBetween, formatDaysRange } from "../lib/dateFormat";
import { ReservationCard } from "../components/ReservationCard";
import { getBookings } from "../queries";

export default async function BookingsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getBookings(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Booking requests for you
      </h2>

      {data.length === 0 ? (
        <NoItems
          title="Hey, you dont have any booking requests"
          description="Make sure you have added your offer!"
        />
      ) : (
        <div className="mt-8">
          {data
            .filter((item) => item.Vehicle !== null)
            .reverse()
            .map((item: any, index: number) => (
              <ReservationCard
                key={index}
                imagePath={item.Vehicle?.photo as string}
                userId={user.id}
                isInFavorites={item.Vehicle?.Favorite.length > 0}
                dates={formatDaysRange(item.startDate, item.endDate)}
                totalPrice={
                  daysBetween(item.startDate, item.endDate) *
                  item.Vehicle?.price
                }
                title={item.Vehicle?.title as string}
                status={item.status}
                person={item.User.firstName + " " + item.User.lastName}
                url={`/booking/${item.id}`}
              />
            ))}
        </div>
      )}
    </section>
  );
}
