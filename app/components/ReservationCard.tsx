import Image from "next/image";
import Link from "next/link";
import { DeleteFromFavoriteButton } from "./FavoriteButton";

const StatusType: { [key: string]: string } = {
  Pending: "text-blue-500",
  Confirmed: "text-green-500",
  Declined: "text-red-500",
};

type ReservationCardProps = {
  imagePath: string;
  userId: string | undefined;
  isInFavorites: boolean;
  reservationId: string;
  title: string;
  status: string;
  person: string;
  dates: string;
  totalPrice: number;
};

export function ReservationCard({
  imagePath,
  userId,
  isInFavorites,
  title,
  reservationId,
  status,
  person,
  dates,
  totalPrice,
}: ReservationCardProps) {
  return (
    <div className="mb-4 bg-gray-50 rounded-xl border-[1px] hover:border-gray-500 shadow-xl max-w-[800px]">
      <Link href={`/reservation/${reservationId}`} className="flex flex-row">
        <div className="relative h-36 w-1/3 mr-4">
          <Image
            src={`https://ulsjeycbmhzuambfgfob.supabase.co/storage/v1/object/public/images/${imagePath}`}
            alt="Offer Image"
            fill
            className="rounded-lg h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
          {userId && (
            <div className="z-10 absolute top-2 right-2">
              {isInFavorites && <DeleteFromFavoriteButton disabled={true} />}
            </div>
          )}
        </div>

        <div className="w-full px-5">
          <div className="flex flex-row pt-2 w-full justify-between">
            <p className="font-medium text-base">{title}</p>
            <p className="text-muted-foreground">
              Status:{" "}
              <span className={`font-medium ${StatusType[status]}`}>
                {status}
              </span>
            </p>
          </div>
          <div className="flex flex-row pt-2 w-full justify-between">
            <p>{dates}</p>
            <p className="pt-2 text-muted-foreground">
              Total Price:{" "}
              <span className="font-medium text-black">${totalPrice}</span>
            </p>
          </div>
          <div className="pt-2 w-full">
            <p className="pt-2 text-muted-foreground">{person}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
