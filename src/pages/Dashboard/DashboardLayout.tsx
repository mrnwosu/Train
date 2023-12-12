import { DashboardMenu } from "~/components/Dasbhoard/DasbhoardMenu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-screen border-yellow-300 bg-yellow-950/50 [&>div>div]:rounded-lg">
      <div className=" flex h-full flex-row items-center justify-center gap-2 [&>div]:h-full">
        <div className=" flex flex-row justify-stretch">
          <DashboardMenu />
        </div>
        <div className="w-full overflow-scroll">
          <div className=" relative top-10 mt-10 flex w-full flex-row flex-wrap gap-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
