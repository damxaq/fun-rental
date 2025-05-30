import { createReservation } from "@/app/actions";
import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { OfferMap } from "@/app/components/OfferMap";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import { useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import ImageGallery from "@/app/components/ImageGallery";

async function getData(vehicleId: string) {
  noStore();
  const data = await prisma.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
    select: {
      photo: true,
      gallery: true,
      description: true,
      guests: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      Reservation: {
        where: {
          vehicleId: vehicleId,
        },
      },
      User: {
        select: {
          id: true,
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

export default async function OfferRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData(id);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(data?.Reservation);

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-10 mb-20">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <ImageGallery
        gallery={[data?.photo as string, ...(data?.gallery as string[])]}
      />
      <div className="flex justify-between gap-x-24 mt-8 flex-col lg:flex-row">
        <div className="lg:w-2/3 w-full">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p>
          </div>
          <div className="flex items-center mt-6">
            <Image
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
              width={100}
              height={100}
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Host since 2020</p>
            </div>
          </div>

          <Separator className="my-7" />

          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />
          <OfferMap locationValue={country?.value as string} />
        </div>
        <form action={createReservation}>
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="vehicleId" value={id} />
          <input type="hidden" name="ownerId" value={data?.User?.id} />
          <SelectCalendar reservation={data?.Reservation} />
          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              {/* TODO: redirect to the same page after login */}
              <Link href="/api/auth/login">Make a reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
