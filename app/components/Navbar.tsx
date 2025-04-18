import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/fun-rental-desktop.png";
import MobileLogo from "../../public/fun-rental-mobile.jpg";
import { UserNav } from "./UserNav";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-32 hidden md:block"
          />
          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="block md:hidden w-12"
          />
        </Link>
        <div className="rounded-full border px-5 py-2">
          <h1>Hello</h1>
        </div>

        <UserNav />
      </div>
    </nav>
  );
}
