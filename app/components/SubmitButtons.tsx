"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type CreationSubmitProps = {
  disabledNext?: boolean;
};

export function CreationSubmit({ disabledNext = false }: CreationSubmitProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button
          type="submit"
          size="lg"
          className="cursor-pointer"
          disabled={disabledNext}
        >
          Next
        </Button>
      )}
    </>
  );
}

export function ReservationSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full h-16">
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full cursor-pointer h-16">
          REQUEST TO BOOK
        </Button>
      )}
    </>
  );
}
