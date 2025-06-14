import Image from "next/image";
import { categoryItems } from "../lib/categoryItems";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export function CategoryShowcase({ categoryName }: { categoryName: string }) {
  const category = categoryItems.find((item) => item.name === categoryName);

  return (
    <div className="flex items-center">
      <Image
        src={category?.imageUrl as StaticImport}
        alt="Category Image"
        width={40}
        height={40}
      />
      <div className="flex flex-col ml-4">
        <h3 className="font-medium">{category?.title}</h3>
        <p className="text-sm text-muted-foreground">{category?.description}</p>
      </div>
    </div>
  );
}
