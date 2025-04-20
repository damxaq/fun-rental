"use client";

import { createLocation } from "@/app/actions";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { useCountries } from "@/app/lib/getCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState, use } from "react";

export default function AddressRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { getAllCountries } = useCountries();
  const [locationValue, setLocationValue] = useState("");

  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  const { id } = use(params);

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your Boat located?
        </h2>
      </div>
      <form action={createLocation}>
        <input type="hidden" name="homeId" value={id ? id : ""} />
        <input
          type="hidden"
          name="countryValue"
          value={locationValue ? locationValue : ""}
        />
        <div className="w-3/5 mx-auto mb-36">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {/* TODO: Flags dont work on windows: https://stackoverflow.com/questions/54519758/flag-emojis-not-rendering/54663926 */}
                      {country.flag} {country.label} / {country.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={locationValue} />
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}
