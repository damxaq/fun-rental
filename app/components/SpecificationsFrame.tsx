import React from "react";
import Frame from "./Frame";
import { getSingleVehicle } from "../queries";
import { specificationsPlaceholder } from "../lib/placeholders";

const SpecificationsFrame = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getSingleVehicle>>;
}) => {
  return (
    <Frame>
      <h1 className="font-medium text-2xl mb-5 capitalize">Specifications</h1>
      <div>
        <div className="grid grid-cols-2 row-span-3 gap-5">
          {Object.keys(specificationsPlaceholder).map((feature) => (
            <div key={feature}>
              <span>{feature}: </span>
              <span className="font-bold">
                {specificationsPlaceholder[feature]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
};

export default SpecificationsFrame;
