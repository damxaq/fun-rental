import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { cancelReservation, changeStatus } from "../actions";

const StatusType: { [key: string]: string } = {
  Pending: "text-blue-500",
  Confirmed: "text-green-500",
  Declined: "text-red-500",
};

type ReservationDetailsProps = {
  id: string;
  title: string;
  photo: string;
  location: string;
  profileImage: string;
  person: string;
  categoryName: string;
  dates: string;
  status: string;
  isOwner?: boolean;
};

export default function ReservationDetails({
  id,
  title,
  photo,
  location,
  profileImage,
  person,
  categoryName,
  dates,
  status,
  isOwner = false,
}: ReservationDetailsProps) {
  return (
    <div className="w-full md:w-1/2">
      <div className="relative h-52">
        <Image
          src={`https://ulsjeycbmhzuambfgfob.supabase.co/storage/v1/object/public/images/${photo}`}
          alt="Offer Image"
          fill
          className="rounded-lg h-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8 flex-col lg:flex-row">
        <div className="w-full">
          <h3 className="text-xl font-medium">{title}</h3>
          <Separator className="my-2" />
          <h3 className="text-lg font-medium">{location}</h3>
          <div className="flex items-center mt-6">
            <Image
              src={
                profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
              width={100}
              height={100}
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {person}</h3>
              <p className="text-sm text-muted-foreground">Host since 2020</p>
            </div>
          </div>
          <Separator className="my-2" />

          <CategoryShowcase categoryName={categoryName} />
          <Separator className="my-2" />
          <span className="text-muted-foreground">{dates}</span>
          <Separator className="my-2" />
          <div className="flex gap-x-2 text-muted-foreground">
            {/* <p>{data?.guests} Guests</p> */}
            <p> Guests</p>
          </div>
          <Separator className="my-2" />
          {isOwner ? (
            status === "Pending" ? (
              <div className="flex flex-row justify-between w-full px-4">
                <form action={changeStatus}>
                  <div>
                    <input type="hidden" name="reservationId" value={id} />
                    <input type="hidden" name="status" value="Confirmed" />
                    <button
                      className={`font-medium cursor-pointer ${StatusType.Confirmed}`}
                    >
                      Approve
                    </button>
                  </div>
                </form>
                <form action={changeStatus}>
                  <div>
                    <input type="hidden" name="reservationId" value={id} />
                    <input type="hidden" name="status" value="Declined" />
                    <button
                      className={`font-medium cursor-pointer ${StatusType.Declined}`}
                    >
                      Decline
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <span className={`font-medium ${StatusType[status]}`}>
                {status}
              </span>
            )
          ) : (
            <div className="flex flex-row justify-between">
              <span className={`font-medium ${StatusType[status]}`}>
                {status}
              </span>
              <form action={cancelReservation}>
                <input type="hidden" name="reservationId" value={id} />
                <button className="text-red-600 font-medium cursor-pointer">
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
