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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import { OfferMap } from "./OfferMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "./Counter";

export function SearchComponent() {
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Any Guests</p>
          </div>

          <SearchIcon className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col">
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
                required
                onValueChange={(value) => setLocationValue(value)}
                value={locationValue}
              >
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
              <OfferMap locationValue={locationValue} />
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
                      <h3 className="underline font-medium">Guests</h3>
                      <p className="text-muted-foreground text-sm">
                        How many guests you want invite?
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
