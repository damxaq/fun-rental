import { prisma } from "@/lib/prisma";
import { NoItems } from "../components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { daysBetween, formatDaysRange } from "../lib/dateFormat";
import { ReservationCard } from "../components/ReservationCard";

async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      status: true,
      User: {
        select: {
          id: true,
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
      Vehicle: {
        select: {
          id: true,
          photo: true,
          title: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  console.log("dadadada", data);

  return data;
}

export default async function BookingsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);

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
          {data.reverse().map((item: any, index: number) => (
            <ReservationCard
              key={index}
              imagePath={item.Vehicle?.photo as string}
              userId={user.id}
              isInFavorites={item.Vehicle?.Favorite.length > 0}
              dates={formatDaysRange(item.startDate, item.endDate)}
              totalPrice={
                daysBetween(item.startDate, item.endDate) * item.Vehicle?.price
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
