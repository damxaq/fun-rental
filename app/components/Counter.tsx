"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

export function Counter({ name, max = 0 }: { name: string; max?: number }) {
  const [amount, setAmount] = useState(0);

  function increase() {
    if (max == 0 || amount < max) setAmount((amount) => amount + 1);
  }
  function decrease() {
    if (amount > 0) setAmount((amount) => amount - 1);
  }

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={amount} />
      <Button variant="outline" size="icon" type="button" onClick={decrease}>
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{amount}</p>
      <Button variant="outline" size="icon" type="button" onClick={increase}>
        <Plus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
}
