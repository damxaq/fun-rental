import React, { ReactNode } from "react";

const Frame = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="border-blue-200 border-1 px-6 py-4 rounded-xl w-full mb-10"
      style={{ background: "#f7fdff" }}
    >
      {/* TODO: add color to tailwind */}
      {children}
    </div>
  );
};

export default Frame;
