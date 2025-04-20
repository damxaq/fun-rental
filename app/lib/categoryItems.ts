interface iAppProps {
  name: string;
  title: string;
  imageUrl: string;
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
    imageUrl: "/categories/sail-boat.png",
  },
  {
    id: 1,
    name: "motorBoat",
    description: "Classic boat with propeller",
    title: "Motor Boat",
    imageUrl: "/categories/boat.png",
  },
  {
    id: 2,
    name: "yacht",
    description: "Most luxurious offers",
    title: "Yacht",
    imageUrl: "/categories/yacht.png",
  },
  {
    id: 3,
    name: "jetski",
    description: "Small and fast",
    title: "Jetski",
    imageUrl: "/categories/jetski.png",
  },
  {
    id: 4,
    name: "kayak",
    description: "If you want to row",
    title: "Kayak",
    imageUrl: "/categories/kayak.png",
  },
  {
    id: 5,
    name: "pontoon",
    description: "Rent inflatable pontoon",
    title: "Pontoon",
    imageUrl: "/categories/pontoon.png",
  },
  {
    id: 6,
    name: "golfCart",
    description: "Rent a golf cart for transporting",
    title: "Golf Cart",
    imageUrl: "/categories/golf-cart.png",
  },
];
