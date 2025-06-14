"use client";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export const ImageGallery = ({ gallery }: { gallery: string[] }) => {
  const [fullImageIndex, setFullImageIndex] = useState(0);
  if (typeof window !== "undefined") window.scrollTo(0, 0);

  function handleNextImage() {
    setFullImageIndex((prev) => prev + 1);
  }

  function handlePreviousImage() {
    setFullImageIndex((prev) => prev - 1);
  }

  return (
    <div className="flex flex-col w-[95%] lg:w-[60%] mb-8">
      <div className="relative h-[200px] md:h-[450px] mb-4">
        <Image
          alt="Offer Image"
          src={`https://ulsjeycbmhzuambfgfob.supabase.co/storage/v1/object/public/images/${gallery[fullImageIndex]}`}
          className="rounded-lg h-full object-cover w-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          width={800}
          height={500}
        />
        {fullImageIndex < gallery.length - 1 && (
          <div
            className="absolute right-2 top-[45%] text-white opacity-80 cursor-pointer select-none"
            onClick={handleNextImage}
          >
            <ArrowBigRight size={50} />
          </div>
        )}
        {fullImageIndex > 0 && (
          <div
            className="absolute left-2 top-[45%] text-white opacity-80 cursor-pointer select-none"
            onClick={handlePreviousImage}
          >
            <ArrowBigLeft size={50} />
          </div>
        )}
      </div>
      {gallery && gallery.length > 1 && (
        <div className="w-full flex flex-row overflow-x-scroll">
          {gallery.map((image: string, index: number) => (
            <Image
              key={index}
              src={`https://ulsjeycbmhzuambfgfob.supabase.co/storage/v1/object/public/images/${encodeURI(
                image
              )}`}
              className={`rounded-xl w-72 mx-2 mb-2 cursor-pointer hover:opacity-80 ${
                image === gallery[fullImageIndex] ? "opacity-30" : ""
              }`}
              sizes="(max-width: 768px) 100vw, 33vw"
              width={80}
              height={80}
              alt="Gallery image"
              onClick={() => setFullImageIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
