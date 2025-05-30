/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { createFunRent } from "../actions";

export async function UserNav() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const createFunRentWithId = createFunRent.bind(null, {
    userId: user?.id as string,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3 cursor-pointer">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

          <img
            src={
              user?.picture ??
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="user image"
            className="rounded-full h-8 w-8 hidden md:block"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <DropdownMenuItem asChild>
              <form action={createFunRentWithId} className="w-full">
                <button
                  type="submit"
                  className="w-full text-start cursor-pointer"
                >
                  Rent your Vehicle
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/my-offers" className="w-full cursor-pointer">
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/favorites" className="w-full cursor-pointer">
                My Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/reservations" className="w-full cursor-pointer">
                My Reservations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/bookings" className="w-full cursor-pointer">
                Bookings Awaiting
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutLink className="w-full cursor-pointer">Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <RegisterLink className="w-full cursor-pointer">
                Register
              </RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <LoginLink className="w-full cursor-pointer">Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
