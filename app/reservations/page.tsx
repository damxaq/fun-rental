import prisma from "@/lib/prisma";
import { NoItems } from "../components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { ReservationCard } from "../components/ReservationCard";

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
          description: true,
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

  console.log("data", data);

  return data;
}

export default async function ReservationsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
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
          {data.map((item: any, index: number) => (
            <ReservationCard
              key={index}
              location={item.Vehicle?.country as string}
              vehicleId={item.Vehicle?.id as string}
              imagePath={item.Vehicle?.photo as string}
              price={item.Vehicle?.price as number}
              userId={user.id}
              isInFavorites={item.Vehicle?.Favorite.length > 0}
              startDate={item.startDate}
              endDate={item.endDate}
              reservationId={item.id}
              status={item.status}
            />
          ))}
        </div>
      )}
    </section>
  );
}
