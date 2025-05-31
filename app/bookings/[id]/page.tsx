import { useCountries } from "@/app/lib/getCountries";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { Chat } from "@/app/components/Chat";
import { formatDaysRange } from "@/app/lib/dateFormat";
import ReservationDetails from "@/app/components/ReservationDetails";

// TODO: add loading screen for booking

async function getData(reservationId: string) {
  noStore();
  const data = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
    select: {
      startDate: true,
      endDate: true,
      status: true,
      //TODO: how many guests
      // who is renting
      User: {
        select: {
          id: true,
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
      messages: {
        select: {
          id: true,
          content: true,
          userName: true,
          createdAt: true,
        },
      },
      Vehicle: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          title: true,
          categoryName: true,
        },
      },
    },
  });
  console.log(data);

  return data;
}

export default async function ReservationDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const { id } = await params;
  const data = await getData(id);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.Vehicle?.country as string);

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-10 mb-20 flex flex-col md:flex-row">
      <ReservationDetails
        title={data?.Vehicle?.title as string}
        photo={data?.Vehicle?.photo as string}
        location={`${country?.label} / ${country?.region}`}
        profileImage={data?.User?.profileImage as string}
        person={data?.User?.firstName + " " + data?.User?.lastName}
        categoryName={data?.Vehicle?.categoryName as string}
        dates={formatDaysRange(data?.startDate, data?.endDate)}
        status={data?.status as string}
      />
      <Chat
        id={id}
        userName={`${user.given_name} ${user.family_name}`}
        messages={data?.messages}
      />
    </div>
  );
}
