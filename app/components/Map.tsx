"use client";

import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { Location } from "../create/[id]/address/page";

type MapProps = {
  offerLocation: Location;
  setOfferLocation?: (offerLocation: Location) => void;
};

export default function Map({ offerLocation, setOfferLocation }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [latitude, setLatitude] = useState<number>(offerLocation.latitude);
  const [longitude, setLongitude] = useState<number>(offerLocation.longitude);

  const center = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude]
  );

  const addressRef = useRef<any>(null);

  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      // map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const handleOnPlacesChanged = () => {
    const address = addressRef.current.getPlaces();
    if (address) {
      changeCoordinates(address[0].geometry.location);
      const { address_components, formatted_address } = address[0];
      const newLocation: Location = {
        fullAddress: formatted_address,
        latitude: address[0].geometry.location.lat(),
        longitude: address[0].geometry.location.lng(),
      };
      if (address_components && address_components.length) {
        for (const address_comp of address_components) {
          if (address_comp.types.includes("country")) {
            newLocation.country = address_comp.long_name;
          }
          if (address_comp.types.includes("locality")) {
            newLocation.city = address_comp.long_name;
          }
          if (
            address_comp.types.includes("route") ||
            address_comp.types.includes("neighborhood")
          ) {
            newLocation.street = address_comp.long_name;
          }
        }
      }
      if (setOfferLocation) {
        setOfferLocation(newLocation);
      }
    }
  };

  const changeCoordinates = (coord: {
    lat: () => number;
    lng: () => number;
  }) => {
    setLatitude(coord.lat());
    setLongitude(coord.lng());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleOnPlacesChanged();
    }
  };

  useEffect(() => {
    map?.panTo({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  return (
    <div>
      {isLoaded && (
        <div>
          <div>
            {setOfferLocation && (
              <StandaloneSearchBox
                onLoad={(ref) => {
                  addressRef.current = ref;
                }}
                onPlacesChanged={handleOnPlacesChanged}
              >
                <input
                  type="text"
                  placeholder="Type your address"
                  className="border w-full h-10 mb-6 rounded-full px-4"
                  onKeyDown={handleKeyDown}
                />
              </StandaloneSearchBox>
            )}
          </div>
          <div>
            <GoogleMap
              mapContainerStyle={{
                maxWidth: "700px",
                height: "500px",
                borderRadius: "10px",
                margin: "auto",
              }}
              center={center}
              zoom={10} // TODO: set dynamic zoom
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                streetViewControl: false,
                mapTypeId: "roadmap",
                minZoom: 3,
                mapTypeControl: false,
              }}
            >
              <MarkerF position={center} />
            </GoogleMap>
          </div>
        </div>
      )}
    </div>
  );
}
