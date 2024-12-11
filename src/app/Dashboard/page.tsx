import { DashboardCell } from "~/components/Dasbhoard/DashboardCell";
import DashboardLayout from "./layout";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  
  const { data: sessionData } = useSession();

  const nextWorkoutResult = api.workout.getNextWorkoutForUser.useQuery({ clientId: sessionData?.user?.id ?? "" });
  console.log({ data: nextWorkoutResult.data });

  return (
    <DashboardLayout>
      <div className=" grid grid-rows-2 flex-wrap grow grid-cols-4 gap-4 p-4">
        <DashboardCell title="Upcoming Workouts" description="This is A Description" colspan={1}>
          <div>random</div>
        </DashboardCell>
      </div>
    </DashboardLayout>
  );
}
