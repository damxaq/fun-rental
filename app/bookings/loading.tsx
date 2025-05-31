import { SkeletonCard } from "../components/SkeletonCard";

export default function BookingsLoading() {
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Booking requests for you
      </h2>
      <div className="gap-8 mt-8 max-w-[800px]">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </section>
  );
}
