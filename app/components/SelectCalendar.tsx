"use client";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import React, { useEffect, useState } from "react";
import { eachDayOfInterval } from "date-fns";
import { ReservationSubmitButton } from "./SubmitButtons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { daysBetween } from "../lib/dateFormat";

export function SelectCalendar({
  reservation,
  isUserSignedIn = false,
  price,
}: {
  reservation:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
  isUserSignedIn?: boolean;
  price: number;
}) {
  const [daysRange, setDaysRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [daysCount, setDaysCount] = useState(1);

  let disabledDates: Date[] = [];
  reservation?.forEach((resItem) => {
    const dateRage = eachDayOfInterval({
      start: new Date(resItem.startDate),
      end: new Date(resItem.endDate),
    });

    disabledDates = [...disabledDates, ...dateRage];
  });

  useEffect(() => {
    setDaysCount(daysBetween(daysRange[0].startDate, daysRange[0].endDate));
  }, [daysRange]);

  return (
    <div className="w-full flex justify-center">
      <input
        type="hidden"
        name="startDate"
        value={daysRange[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={daysRange[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={daysRange}
        onChange={(item) => setDaysRange([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 2))}
        disabledDates={disabledDates}
        className="rounded-xl"
      />
      <div className="fixed w-full bottom-0 left-0 bg-white shadow-[0_0_20px] shadow-blue-400/20 z-50 h-20 flex justify-end px-8 items-center">
        <div className="w-40">
          <div className="flex flex-col h-16">
            <p className="font-bold text-xl">from ${price * daysCount}</p>
            <p className="text-muted-foreground">
              {daysCount} day{daysCount > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="w-40">
          {isUserSignedIn ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full h-16" asChild>
              <Link href="/api/auth/login">REQUEST TO BOOK</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
