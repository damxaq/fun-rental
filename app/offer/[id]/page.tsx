import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ImageGallery } from "@/app/components/ImageGallery";
import { getSingleVehicle } from "@/app/queries";
import OfferDetailsFrame from "@/app/components/OfferDetailsFrame";
import FeaturesFrame from "@/app/components/FeaturesFrame";
import { createReservation } from "@/app/actions";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import { OfferMap } from "@/app/components/OfferMap";
import SpecificationsFrame from "@/app/components/SpecificationsFrame";

export default async function OfferRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getSingleVehicle(id);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="w-[95%] md:w-[90%] lg:w-[85%] mx-auto mt-10 mb-32">
      <div className="flex flex-col lg:flex-row mb-12">
        <ImageGallery
          gallery={[data?.photo as string, ...(data?.gallery as string[])]}
        />
        <OfferDetailsFrame data={data} />
      </div>
      <Separator />
      <div className="flex justify-between gap-x-24 mt-8 flex-col lg:flex-row gap-y-6">
        <div className="w-full lg:w-[40%]">
          <h1 className="font-medium text-2xl mb-5 capitalize">
            {data?.categoryName} details
          </h1>
          <div className="flex justify-center w-full">
            <i className="text-2xl mb-5 capitalize font-medium text-muted-foreground underline font-serif">
              {data?.title}
            </i>
          </div>
          <p className="text-muted-foreground">{data?.description}</p>
        </div>
        <div className="w-full lg:w-[60%]">
          <FeaturesFrame data={data} />
          <SpecificationsFrame data={data} />
        </div>
      </div>
      <Separator />
      <div className="flex justify-between gap-x-24 mt-8 flex-col lg:flex-row gap-y-6 bg-blue-900 p-4 rounded-xl">
        <div className="w-full lg:w-[40%]">
          <h1 className="font-medium text-2xl mb-5 capitalize text-white">
            Booking options
          </h1>
          <p className="text-white">Please select your booking options.</p>
        </div>
        <div className="w-full lg:w-[60%]">
          <form action={createReservation}>
            <input type="hidden" name="userId" value={user?.id} />
            <input type="hidden" name="vehicleId" value={id} />
            <input type="hidden" name="ownerId" value={data?.User?.id} />
            <SelectCalendar
              reservation={data?.Reservation}
              isUserSignedIn={!!user?.id}
              price={data?.price as number}
            />
          </form>
        </div>
      </div>
      <Separator className="my-10" />
      <div className="flex justify-between gap-x-24 mt-8 flex-col lg:flex-row gap-y-6">
        <div className="w-full lg:w-[60%]">
          {data?.latitude && data.longitude && (
            <OfferMap
              locationValue={{
                latitude: data.latitude,
                longitude: data.longitude,
              }}
            />
          )}
        </div>
        <div className="w-full lg:w-[40%]">
          <h1 className="font-medium text-2xl mb-5 capitalize">
            {data?.categoryName} location
          </h1>
          <p>
            Exact location information is provided after a booking is confirmed
            by the owner.
          </p>
        </div>
      </div>
    </div>
  );
}
