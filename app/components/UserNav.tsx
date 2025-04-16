import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import DefaultAvatar from "../../public/default-avatar.jpg";

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3 cursor-pointer">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="user image"
            className="rounded-full h-8 w-8 hidden md:block"
          />
        </div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
