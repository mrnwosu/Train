import { DashboardMenu } from "~/components/Dasbhoard/DasbhoardMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-screen border-yellow-300 bg-gradient-to-r from-black to-zinc-800 [&>div>div]:rounded-lg">
      <div className=" flex h-full flex-row items-center justify-center gap-2 [&>div]:h-[98%]">
        <div className=" w-1/6 bg-yellow-500/20">
          <DashboardMenu />
        </div>
        <div className=" w-5/6 overflow-scroll bg-gradient-to-r from-zinc-950 to-black">
          <div className=" relative top-10 m-10 flex flex-row flex-wrap gap-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
