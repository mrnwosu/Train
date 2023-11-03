import { DashboardMenu } from "~/components/DasbhoardMenu";
import { DashboardCell } from "~/components/DashboardCell";
import DashboardLayout from "./DashboardLayout";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data } = useSession();

    //add guards.

  return (
    <DashboardLayout>
      <DashboardCell
        title="Upcoming Workouts"
        description="This is A Description"
      >
        <div>random</div>
      </DashboardCell>
      <DashboardCell
        title="This weeks goals"
        description="This is A Description"
      >
        <div>random</div>
      </DashboardCell>
    </DashboardLayout>
  );
}
