import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getVehicles(
  userId: string | undefined,
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
  }
) {
  noStore();
  const data = await prisma.vehicle.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });

  return data;
}

export async function getBookings(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      status: true,
      User: {
        select: {
          id: true,
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
      Vehicle: {
        select: {
          id: true,
          photo: true,
          title: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  return data;
}

export async function getBooking(reservationId: string) {
  noStore();
  const data = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
    select: {
      startDate: true,
      endDate: true,
      status: true,
      //TODO: how many guests
      // who is renting
      User: {
        select: {
          id: true,
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
      messages: {
        select: {
          id: true,
          content: true,
          userName: true,
          createdAt: true,
        },
      },
      Vehicle: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          title: true,
          categoryName: true,
        },
      },
    },
  });

  return data;
}

export async function getReservations(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      status: true,
      Vehicle: {
        select: {
          id: true,
          country: true,
          photo: true,
          title: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
          User: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return data;
}

export async function getReservation(reservationId: string) {
  noStore();
  const data = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
    select: {
      startDate: true,
      endDate: true,
      status: true,
      //TODO: how many guests
      // who is renting
      User: {
        select: {
          id: true,
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
      messages: {
        select: {
          id: true,
          content: true,
          userName: true,
          createdAt: true,
        },
      },
      Vehicle: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          title: true,
          categoryName: true,
          User: {
            select: {
              profileImage: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return data;
}

export async function getFavorites(userId: string) {
  noStore();
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Vehicle: {
        select: {
          photo: true,
          id: true,
          Favorite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });
  return data;
}

export async function getOwnedVehicles(userId: string) {
  noStore();
  const data = await prisma.vehicle.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      country: true,
      description: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export async function getSingleVehicle(vehicleId: string) {
  noStore();
  const data = await prisma.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
    select: {
      photo: true,
      gallery: true,
      description: true,
      guests: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      Reservation: {
        where: {
          vehicleId: vehicleId,
        },
      },
      User: {
        select: {
          id: true,
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}
