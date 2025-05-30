import { prisma } from "@/lib/prisma";
import { NoItems } from "../components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { ReservationCard } from "../components/ReservationCard";
import { daysBetween, formatDaysRange } from "../lib/dateFormat";

async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      status: true,
      Vehicle: {
        select: {
          id: true,
          country: true,
          photo: true,
          title: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
          User: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  console.log("data", data);

  return data;
}

export default async function ReservationsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);

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
          {data.reverse().map((item: any, index: number) => (
            <ReservationCard
              key={index}
              title={item.Vehicle.title}
              imagePath={item.Vehicle?.photo as string}
              userId={user.id}
              isInFavorites={item.Vehicle?.Favorite.length > 0}
              dates={formatDaysRange(item.startDate, item.endDate)}
              totalPrice={
                daysBetween(item.startDate, item.endDate) * item.Vehicle?.price
              }
              reservationId={item.id}
              status={item.status}
              person={
                item.Vehicle.User.firstName + " " + item.Vehicle.User.lastName
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
