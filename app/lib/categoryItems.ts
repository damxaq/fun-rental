import { StaticImageData } from "next/image";
import Yacht from "../../public/categories/yacht.png";
import Sail_Boat from "../../public/categories/sail-boat.png";
import Boat from "../../public/categories/boat.png";
import JetSki from "../../public/categories/jetski.png";
import Kayak from "../../public/categories/kayak.png";
import Pontoon from "../../public/categories/pontoon.png";
import GolfCart from "../../public/categories/golf-cart.png";

interface iAppProps {
  name: string;
  title: string;
  imageUrl: StaticImageData;
  description: string;
  id: number;
}

// TODO: Store categories in DB
export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "sailBoat",
    description: "For sailing adventures",
    title: "Sail Boat",
    imageUrl: Sail_Boat,
  },
  {
    id: 1,
    name: "motorBoat",
    description: "Classic boat with propeller",
    title: "Motor Boat",
    imageUrl: Boat,
  },
  {
    id: 2,
    name: "yacht",
    description: "Most luxurious offers",
    title: "Yacht",
    imageUrl: Yacht,
  },
  {
    id: 3,
    name: "jetski",
    description: "Small and fast",
    title: "Jetski",
    imageUrl: JetSki,
  },
  {
    id: 4,
    name: "kayak",
    description: "If you want to row",
    title: "Kayak",
    imageUrl: Kayak,
  },
  {
    id: 5,
    name: "pontoon",
    description: "Rent inflatable pontoon",
    title: "Pontoon",
    imageUrl: Pontoon,
  },
  {
    id: 6,
    name: "golfCart",
    description: "Rent a golf cart for transporting",
    title: "Golf Cart",
    imageUrl: GolfCart,
  },
];
