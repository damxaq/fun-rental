import React from "react";
import Frame from "./Frame";
import { getSingleVehicle } from "../queries";
import { featuresPlaceholder } from "../lib/placeholders";

const FeaturesFrame = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getSingleVehicle>>;
}) => {
  return (
    <Frame>
      <h1 className="font-medium text-2xl mb-5 capitalize">Features</h1>
      <div>
        <div className="grid grid-cols-2 row-span-3 gap-5">
          {Object.keys(featuresPlaceholder).map((feature) => (
            <div key={feature}>
              <span>{feature}: </span>
              <span className="font-bold">{featuresPlaceholder[feature]}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
};

export default FeaturesFrame;
