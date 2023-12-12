import React from "react";

export function DashboardCell({
  title,
  description,
  children,
}: {
  title: string;
  description: string | undefined;
  children: React.ReactNode | undefined;
}) {
  return (
    <div className=" h-80 w-[24rem] rounded-md border-8 border-yellow-900/50 bg-yellow-950/50 text-stone-300 shadow-md shadow-zinc-600/20 transition duration-200 hover:text-white">
      <div className=" relative ml-4 mt-4 flex flex-col items-center">
        <h1 className=" text-md relative right-8 w-full text-right ">
          {title}
        </h1>
        <div className=" h-2 w-5/6 justify-end border-b-2 border-emerald-800"></div>
      </div>
      <div className=" ml-4 mt-4">{children}</div>
    </div>
  );
}
