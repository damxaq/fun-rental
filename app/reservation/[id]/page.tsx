import { useCountries } from "@/app/lib/getCountries";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Chat } from "@/app/components/Chat";
import ReservationDetails from "@/app/components/ReservationDetails";
import { formatDaysRange } from "@/app/lib/dateFormat";
import { getReservation } from "@/app/queries";

export default async function ReservationDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const { id } = await params;
  const data = await getReservation(id);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.Vehicle?.country as string);

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-10 mb-20 flex flex-col-reverse md:flex-row">
      <Chat
        id={id}
        userName={`${user.given_name} ${user.family_name}`}
        messages={data?.messages}
      />
      <ReservationDetails
        id={id}
        title={data?.Vehicle?.title as string}
        photo={data?.Vehicle?.photo as string}
        location={`${country?.label} / ${country?.region}`}
        profileImage={data?.Vehicle?.User?.profileImage as string}
        person={
          data?.Vehicle?.User?.firstName + " " + data?.Vehicle?.User?.lastName
        }
        categoryName={data?.Vehicle?.categoryName as string}
        dates={formatDaysRange(data?.startDate, data?.endDate)}
        status={data?.status as string}
      />
    </div>
  );
}
