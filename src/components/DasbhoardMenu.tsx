import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

export function DashboardMenu() {
  const { data: sessionData } = useSession();
  const { data, isLoading } = api.user.getUser.useQuery({
    id: sessionData?.user?.id ?? "",
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative top-3 flex flex-col items-center gap-1 [&>div]:rounded-lg">
          <div className=" flex flex-row items-center gap-2 ">
            <div className=" overflow-hidden rounded-full border-4 border-green-800">
              <Image
                alt="Profile Picture"
                src={data?.image ?? ""}
                width={60}
                height={60}
                layout="cover"
                className=""
              ></Image>
            </div>
            <h1 className=" text-xl shadow-red-500 drop-shadow-lg">
              Your Dashboard{" "}
            </h1>
          </div>
          <div className="h-1 w-3/4 border-b-orange-50"></div>
          <div className="  relative top-10 flex w-full flex-col [&_ul_li]:w-full [&_ul_li]:border-b-2 [&_ul_li]:border-zinc-500 [&_ul_li]:py-2 [&_ul_li]:text-center [&_ul_li]:transition [&_ul_li]:duration-300 ">
            <ul className="">
              <li className=" border-t-2 hover:bg-zinc-700">Profile</li>
              <Link href={"/Dashboard/Workouts"}>
                <li className="           hover:bg-zinc-700">Workouts</li>
              </Link>
              <li className="           hover:bg-zinc-700">Progress</li>
              <li className="           hover:bg-zinc-700">Settings</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
