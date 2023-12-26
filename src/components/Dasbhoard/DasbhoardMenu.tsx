import { $Enums } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

export function DashboardMenu() {
  const { data: sessionData } = useSession();
  const { data, isLoading } = api.user.getUser.useQuery({
    id: sessionData?.user?.id ?? "",
  });

  const user = api.user.getUser.useQuery({ id: sessionData?.user?.id ?? "" });
  const isTrainer = user?.data?.role === $Enums.Role.TRAINER;

  return (
    <div className="w-32 bg-zinc-950/50 text-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative top-3 flex flex-col items-center gap-4 [&>div]:rounded-lg">
          <Link href={"/Dashboard"}>
            <div className=" flex w-28 flex-col items-center gap-2 border-2 border-zinc-950/50 bg-zinc-950/50 p-2">
              <div className=" overflow-hidden rounded-full border-4 border-green-800">
                <Image alt="Profile Picture" src={data?.image ?? ""} width={60} height={60} layout="cover" className="" />
              </div>
              <h1 className=" text-xl shadow-red-500 drop-shadow-lg">Dashboard</h1>
            </div>
          </Link>
          <div className="h-1 w-3/4 bg-zinc-700"></div>
          {!user.isLoading && (
            <div className="  relative flex w-full flex-col items-center justify-center">
              <ul className=" flex flex-col gap-2">
                <li>
                  <DashboardMenuLink href={"/Dashboard/Workouts"} text="Workouts" isTrainer={isTrainer} trainerOnly={true} />
                </li>
                <li>
                  <DashboardMenuLink href={"/Dashboard/Assignments"} text="Assignments" isTrainer={isTrainer} trainerOnly={true} />
                </li>
                <li>
                  <DashboardMenuLink href={"/Dashboard/Settings"} text="⚙️" customFontSite="4xl" isTrainer={isTrainer} trainerOnly={false} />
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type DashboardMenuLinkProps = {
  href: string;
  text: string;
  customFontSite?: string;
  trainerOnly: boolean;
  isTrainer: boolean;
};

function DashboardMenuLink(props: DashboardMenuLinkProps) {
  if (props.trainerOnly && !props.isTrainer) return <></>;

  let classes =
    " w-28 h-24 bg-zinc-950/50 justify-center flex items-center rounded-lg hover:rounded-lg border-2 border-zinc-950/50 hover:bg-zinc-900/50 transition duration-150";
  if (props.customFontSite) {
    classes += ` text-${props.customFontSite}`;
  }
  return (
    <Link href={props.href} className=" justify-center">
      <li className={classes}>{props.text}</li>
    </Link>
  );
}
