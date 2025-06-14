import React from "react";
import Frame from "./Frame";
import { CircleDollarSign, UsersRound, MapPin } from "lucide-react";
import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { getSingleVehicle } from "../queries";

const OfferDetailsFrame = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getSingleVehicle>>;
}) => {
  return (
    <div className="w-[95%] lg:w-[40%] lg:pl-8">
      <h1 className="font-medium text-2xl mb-5 capitalize">{data?.title}</h1>
      <Frame>
        <div className="font-medium flex flex-row gap-2">
          <MapPin /> {data?.city} / {data?.country}
        </div>

        <Separator className="my-4 bg-blue-200" />
        <div className="font-medium flex flex-row gap-2">
          <CircleDollarSign />
          from ${data?.price}
        </div>
        <Separator className="my-4 bg-blue-200" />
        <CategoryShowcase categoryName={data?.categoryName as string} />
        <Separator className="my-4 bg-blue-200" />
        <div className="text-muted-foreground flex flex-row gap-2">
          <UsersRound />
          {data?.guests && data.guests !== "0" ? (
            <p>Up to {data?.guests} passengers</p>
          ) : (
            <p>No passengers</p>
          )}
        </div>
        <Separator className="my-4 bg-blue-200" />
        <div className="flex items-center mt-6">
          <Image
            src={
              data?.User?.profileImage ??
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="User Profile"
            className="w-10 h-10 rounded-full"
            width={100}
            height={100}
          />
          <div className="flex flex-col ml-4">
            <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
            <p className="text-sm text-muted-foreground">Host since 2020</p>
          </div>
        </div>
      </Frame>
    </div>
  );
};

export default OfferDetailsFrame;
