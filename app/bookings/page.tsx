import { prisma } from "@/lib/prisma";
import { NoItems } from "../components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { BookingCard } from "../components/BookingCard";

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
          {data.map((item: any, index: number) => (
            <BookingCard
              key={index}
              vehicleId={item.Vehicle?.id as string}
              imagePath={item.Vehicle?.photo as string}
              price={item.Vehicle?.price as number}
              userId={user.id}
              isInFavorites={item.Vehicle?.Favorite.length > 0}
              startDate={item.startDate}
              endDate={item.endDate}
              reservationId={item.id}
              firstName={item.User.firstName}
              lastName={item.User.lastName}
              title={item.Vehicle?.title as string}
              status={item.status}
            />
          ))}
        </div>
      )}
    </section>
  );
}
