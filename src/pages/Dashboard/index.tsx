import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { api } from "~/utils/api";

export default function Dashboard() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <div>Not logged in</div>;
  }

  return <div>{JSON.stringify(sessionData.user.id)}</div>;

//   const user = api.user.getUser.useQuery(sessionData?.user?.id);
//   return <div>{user.data?.name}</div>;
}
