import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { OfferMap } from "@/app/components/OfferMap";
import { useCountries } from "@/app/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import ImageGallery from "@/app/components/ImageGallery";
import { redirect } from "next/navigation";

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
          country: true,
          photo: true,
          description: true,
          price: true,
          title: true,
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

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-10 mb-20">
      <p>
        {data.User.firstName} {data.User.lastName}
      </p>
      <img src={data.User.profileImage} alt="profileImage" />
      <p>
        {data.startDate.toLocaleDateString()} -{" "}
        {data.endDate.toLocaleDateString()}
      </p>
      <h1 className="font-medium text-2xl mb-5">{data.Vehicle.title}</h1>
      {/* <ImageGallery gallery={[data.photo, ...data.gallery]} />
      <div className="flex justify-between gap-x-24 mt-8 flex-col lg:flex-row">
        <div className="lg:w-2/3 w-full">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data.guests} Guests</p>
          </div>
          <div className="flex items-center mt-6">
            <Image
              src={
                data.User.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
              width={100}
              height={100}
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data.User.firstName}</h3>
              <p className="text-sm text-muted-foreground">Host since 2020</p>
            </div>
          </div>

          <Separator className="my-7" />

          <CategoryShowcase categoryName={data.categoryName} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data.description}</p>
          <Separator className="my-7" />
          <OfferMap locationValue={country?.value as string} />
        </div>
      </div> */}
    </div>
  );
}
