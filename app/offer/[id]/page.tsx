import { createReservation } from "@/app/actions";
import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { OfferMap } from "@/app/components/OfferMap";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import { useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      Reservation: {
        where: {
          homeId: homeId,
        },
      },
      User: {
        select: {
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
  params: { id: string };
}) {
  const data = await getData(params.id);

  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data.country);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="w-[75%] mx-auto mt-10 mb-20">
      <h1 className="font-medium text-2xl mb-5">{data.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Offer Image"
          src={`https://ulsjeycbmhzuambfgfob.supabase.co/storage/v1/object/public/images/${data.photo}`}
          fill
          className="rounded-lg h-full object-cover w-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data.guests} Guests</p> * <p>{data.bedrooms} Bedrooms</p> *{" "}
            <p>{data.bathrooms} Bathrooms</p>
          </div>
          <div className="flex items-center mt-6">
            <img
              src={
                data.User.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
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
        <form action={createReservation}>
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="homeId" value={params.id} />
          {/* TODO: position calendar at the bottom on mobile */}
          <SelectCalendar reservation={data.Reservation} />
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
