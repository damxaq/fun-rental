import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { useCountries } from "@/app/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { Chat } from "@/app/components/Chat";
import { formatDaysRange } from "@/app/lib/dateFormat";

const StatusType: { [key: string]: string } = {
  Pending: "text-blue-500",
  Confirmed: "text-green-500",
  Declined: "text-red-500",
};

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
          User: {
            select: {
              profileImage: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return data;
}

//TODO: create shared component

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
    <div className="w-[90%] lg:w-[75%] mx-auto mt-10 mb-20 flex">
      <div className="w-full max-h-[600px] mx-6 px-4 border-2 rounded-md shadow-gray-300 shadow-md">
        <Chat
          id={id}
          userName={`${user.given_name} ${user.family_name}`}
          messages={data?.messages}
        />
      </div>
      <div className="w-1/2">
        <div className="relative h-52">
          <Image
            src={`https://ulsjeycbmhzuambfgfob.supabase.co/storage/v1/object/public/images/${data?.Vehicle?.photo}`}
            alt="Offer Image"
            fill
            className="rounded-lg h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </div>
        <div className="flex justify-between gap-x-24 mt-8 flex-col lg:flex-row">
          <div className="w-full">
            <h3 className="text-xl font-medium">{data?.Vehicle?.title}</h3>
            <Separator className="my-2" />
            <h3 className="text-lg font-medium">
              {country?.label} / {country?.region}
            </h3>
            <div className="flex items-center mt-6">
              <Image
                src={
                  data?.Vehicle?.User?.profileImage ??
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="User Profile"
                className="w-11 h-11 rounded-full"
                width={100}
                height={100}
              />
              <div className="flex flex-col ml-4">
                <h3 className="font-medium">
                  Hosted by {data?.Vehicle?.User?.firstName}{" "}
                  {data?.Vehicle?.User?.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">Host since 2020</p>
              </div>
            </div>
            <Separator className="my-2" />

            <CategoryShowcase
              categoryName={data?.Vehicle?.categoryName as string}
            />
            <Separator className="my-2" />
            <span className="text-muted-foreground">
              {formatDaysRange(data?.startDate, data?.endDate)}
            </span>
            <Separator className="my-2" />
            <div className="flex gap-x-2 text-muted-foreground">
              {/* <p>{data?.guests} Guests</p> */}
              <p> Guests</p>
            </div>
            <Separator className="my-2" />
            <span
              className={`font-medium ${StatusType[data?.status as string]}`}
            >
              {data?.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
