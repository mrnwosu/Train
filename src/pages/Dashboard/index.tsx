import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <div>Not logged in</div>;
  }

  return <div>{JSON.stringify(sessionData.user.id)}</div>;

//   const user = api.user.getUser.useQuery(sessionData?.user?.id);
//   return <div>{user.data?.name}</div>;
}
