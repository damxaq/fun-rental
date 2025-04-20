import { createCategoryPage } from "@/app/actions";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { SelectCategory } from "@/app/components/SelectCategory";
import { use } from "react";

export default function StructureRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Vehicle?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="vehicleId" value={id} />
        <SelectCategory />
        <CreationBottomBar />
      </form>
    </>
  );
}
