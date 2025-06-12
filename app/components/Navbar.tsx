import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/fun-rental-desktop.png";
import MobileLogo from "../../public/fun-rental-mobile.jpg";
import { UserNav } from "./UserNav";
import { SearchComponent } from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-2 relative">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-40 hidden md:block"
            priority={true}
          />
          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="block md:hidden min-w-12 w-12 mr-2"
            priority={true}
          />
        </Link>

        <SearchComponent />

        <UserNav />
      </div>
    </nav>
  );
}
