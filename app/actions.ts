"use server";

import { ChatMessage } from "@/hooks/use-realtime-chat";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ONE_YEAR = "2592000";

export async function createFunRent({ userId }: { userId: string }) {
  const data = await prisma.vehicle.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // TODO: Switch to swich statement
  if (data === null) {
    const data = await prisma.vehicle.create({
      data: {
        userId: userId,
      },
    });
    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await prisma.vehicle.create({
      data: {
        userId: userId,
      },
    });
    return redirect("/");
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const vehicleId = formData.get("vehicleId") as string;

  const data = await prisma.vehicle.update({
    where: {
      id: vehicleId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });

  return redirect(`/create/${vehicleId}/description`);
}

export async function createDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const galleryFiles = formData.getAll("images[]") as File[];
  const imageFile = formData.get("image") as File;
  const vehicleId = formData.get("vehicleId") as string;
  const guestNumber = formData.get("guest") as string;

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date().toUTCString()}`, imageFile, {
      cacheControl: ONE_YEAR,
      contentType: "image/png",
    });

  const galleryData: any[] = [];
  if (galleryFiles && galleryFiles.length)
    for (const file of galleryFiles) {
      const { data: galleryItem } = await supabase.storage
        .from("images")
        .upload(`${file.name}-${new Date().toUTCString()}`, file, {
          cacheControl: ONE_YEAR,
          contentType: "image/png",
        });
      galleryData.push(galleryItem?.path);
    }

  const data = await prisma.vehicle.update({
    where: {
      id: vehicleId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      gallery: galleryData,
      guests: guestNumber,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${vehicleId}/address`);
}

export async function createLocation(formData: FormData) {
  const vehicleId = formData.get("vehicleId") as string;
  const countryValue = formData.get("countryValue") as string;

  const data = await prisma.vehicle.update({
    where: {
      id: vehicleId,
    },
    data: {
      addedLocation: true,
      country: countryValue,
    },
  });

  return redirect("/");
}

export async function addToFavorite(formData: FormData) {
  const vehicleId = formData.get("vehicleId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.create({
    data: {
      vehicleId: vehicleId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function addMessage(message: ChatMessage, roomName: string) {
  const data = await prisma.message.create({
    data: {
      content: message.content,
      createdAt: message.createdAt,
      userName: message.user.name,
      reservationId: roomName,
    },
  });
}

export async function removeFromFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function createReservation(formData: FormData) {
  const userId = formData.get("userId") as string;
  const vehicleId = formData.get("vehicleId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const ownerId = formData.get("ownerId") as string;
  // TODO: add guests field

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      vehicleId: vehicleId,
      startDate: startDate,
      endDate: endDate,
      ownerId: ownerId,
      guests: 1,
    },
  });

  return redirect(`/reservation/${data.id}`);
}

export async function cancelReservation(formData: FormData) {
  const reservationId = formData.get("reservationId") as string;

  const data = await prisma.reservation.delete({
    where: {
      id: reservationId,
    },
  });

  return redirect("/");
}

export async function changeStatus(formData: FormData) {
  const reservationId = formData.get("reservationId") as string;
  const status = formData.get("status") as string;

  const data = await prisma.reservation.update({
    where: {
      id: reservationId,
    },
    data: {
      status: status,
    },
  });

  return redirect(`/booking/${reservationId}`);
}
