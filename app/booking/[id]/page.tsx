import { useCountries } from "@/app/lib/getCountries";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Chat } from "@/app/components/Chat";
import { formatDaysRange } from "@/app/lib/dateFormat";
import ReservationDetails from "@/app/components/ReservationDetails";
import { getBooking } from "@/app/queries";

export default async function ReservationDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const { id } = await params;
  const data = await getBooking(id);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.Vehicle?.country as string);

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-10 mb-20 flex flex-col md:flex-row">
      <ReservationDetails
        id={id}
        title={data?.Vehicle?.title as string}
        photo={data?.Vehicle?.photo as string}
        location={`${country?.label} / ${country?.region}`}
        profileImage={data?.User?.profileImage as string}
        person={data?.User?.firstName + " " + data?.User?.lastName}
        categoryName={data?.Vehicle?.categoryName as string}
        dates={formatDaysRange(data?.startDate, data?.endDate)}
        status={data?.status as string}
        isOwner={true}
      />
      <Chat
        id={id}
        userName={`${user.given_name} ${user.family_name}`}
        messages={data?.messages}
      />
    </div>
  );
}
