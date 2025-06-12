"use client";

import { createLocation } from "@/app/actions";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import Map from "@/app/components/Map";
import React, { useState, use } from "react";

export interface Location {
  country?: string;
  city?: string;
  latitude: number;
  longitude: number;
  street?: string;
  fullAddress?: string;
}

const isAddressCorrect = (address: Location) => {
  return !!address.country && !!address.city && !!address.street;
};

export default function AddressRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [offerLocation, setOfferLocation] = useState<Location>({
    latitude: 27.6648,
    longitude: -81.5158,
  });

  const { id } = use(params);

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-4">
          Where is your Boat located?
        </h2>
        <h4 className="font-semibold tracking-tight transition-colors mb-6">
          Please provide address approximately down to the street
        </h4>
      </div>
      <form action={createLocation}>
        <input type="hidden" name="vehicleId" value={id ? id : ""} />
        <input
          type="hidden"
          name="country"
          value={offerLocation.country ? offerLocation.country : ""}
        />
        <input
          type="hidden"
          name="city"
          value={offerLocation.city ? offerLocation.city : ""}
        />
        <input
          type="hidden"
          name="street"
          value={offerLocation.street ? offerLocation.street : ""}
        />
        <input
          type="hidden"
          name="fullAddress"
          value={offerLocation.fullAddress ? offerLocation.fullAddress : ""}
        />
        <input type="hidden" name="latitude" value={offerLocation.latitude} />
        <input type="hidden" name="longitude" value={offerLocation.longitude} />
        <div className="w-3/5 mx-auto mb-36">
          <div className="mb-5"></div>
          <Map
            offerLocation={offerLocation}
            setOfferLocation={setOfferLocation}
          />
        </div>
        <CreationBottomBar disabledNext={!isAddressCorrect(offerLocation)} />
      </form>
    </>
  );
}
