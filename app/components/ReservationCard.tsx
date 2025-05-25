import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { DeleteFromFavoriteButton } from "./FavoriteButton";

const StatusType: { [key: string]: string } = {
  Pending: "text-blue-500",
  Confirmed: "text-green-500",
  Declined: "text-red-500",
};

type ReservationCardProps = {
  imagePath: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavorites: boolean;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  reservationId: string;
  status: string;
};

export function ReservationCard({
  imagePath,
  location,
  price,
  userId,
  isInFavorites,
  vehicleId,
  startDate,
  endDate,
  reservationId,
  status,
}: ReservationCardProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  const daysBetween = Math.round(
    (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );
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
            <p className="font-medium text-base">
              {country?.flag} {country?.label} / {country?.region}
            </p>
            <p className="text-muted-foreground">
              Status:{" "}
              <span className={`font-medium ${StatusType[status]}`}>
                {status}
              </span>
            </p>
          </div>
          <div className="flex flex-row pt-2 w-full justify-between">
            <p>
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </p>
            <p className="pt-2 text-muted-foreground">
              Total Price:{" "}
              <span className="font-medium text-black">
                ${price * daysBetween}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
