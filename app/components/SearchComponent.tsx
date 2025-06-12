"use client";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Select from "react-select";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useCountries } from "../lib/getCountries";
import { OfferMap } from "./OfferMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "./Counter";

export function SearchComponent() {
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries, getCountryByLabel } = useCountries();

  function SubmitButton() {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          Next
        </Button>
      );
    } else if (step === 2) {
      return <CreationSubmit />;
    }
  }

  function getCoords() {
    const latLang = getCountryByLabel(locationValue)?.latLang;
    if (latLang && latLang.length > 1)
      return { latitude: latLang[0], longitude: latLang[1] };
    return { latitude: 27.6648, longitude: -81.5158 };
  }

  function handleSearch(e: any) {
    e.preventDefault();
    e.target.action =
      window.location.origin + "/?" + e.target.action.split("?")[1];
    e.target.submit();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-2 md:px-5 border flex items-center cursor-pointer mr-2">
          <div className="flex h-full divide-x text-sm md:font-medium">
            <p className="px-4">Where</p>
            <p className="px-4">When</p>
            <p className="px-4">Options</p>
          </div>

          <SearchIcon className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <form className="gap-4 flex flex-col" onSubmit={handleSearch}>
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Country</DialogTitle>
                <DialogDescription>
                  Please Choose a Country...
                </DialogDescription>
              </DialogHeader>

              <Select
                options={getAllCountries().map((country) => ({
                  value: country.label,
                  label: `${country.label} / ${country.region}`,
                }))}
                onChange={(label) => setLocationValue(label?.value as string)}
              />
              <OfferMap locationValue={getCoords()} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all the info you need</DialogTitle>
                <DialogDescription>
                  Give details of what are you looking for
                </DialogDescription>
              </DialogHeader>

              <Card>
                <CardHeader className="flex flex-col gap-y-5 items-stretch">
                  <div className="flex items-center justify-between ">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Passengers</h3>
                      <p className="text-muted-foreground text-sm">
                        How many passengers will join you?
                      </p>
                    </div>
                    <Counter name="guest" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
