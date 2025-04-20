import { createDescription } from "@/app/actions";
import { Counter } from "@/app/components/Counter";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { use } from "react";

export default function DescriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your vehicle as good as you can!
        </h2>
      </div>

      <form action={createDescription}>
        <input type="hidden" name="vehicleId" value={id} />
        <div className="w-3/5 mx-auto mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="Short and simple..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              placeholder="What kind of vehicle you want to offer?"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              name="price"
              required
              type="number"
              placeholder="Price per Day in USD"
              min={10}
              max={100000}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name="image" type="file" required />
          </div>

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
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}
