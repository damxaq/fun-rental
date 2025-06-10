import Image from "next/image";
import Link from "next/link";
import {
  AddToFavoriteButton,
  DeleteFromFavoriteButton,
} from "./FavoriteButton";
import { addToFavorite, removeFromFavorite } from "../actions";

type ListingCardProps = {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavorites: boolean;
  favoriteId: string;
  vehicleId: string;
  pathName: string;
};

export function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  isInFavorites,
  favoriteId,
  vehicleId,
  pathName,
}: ListingCardProps) {
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://ulsjeycbmhzuambfgfob.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Offer Image"
          fill
          className="rounded-lg h-full object-cover mb-3"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavorites ? (
              <form action={removeFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="vehicleId" value={vehicleId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/offer/${vehicleId}`} className="mt-2">
        <h3 className="font-medium text-base">{location}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> Day
        </p>
      </Link>
    </div>
  );
}
