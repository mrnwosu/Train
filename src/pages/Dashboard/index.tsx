import { DashboardCell } from "~/components/Dasbhoard/DashboardCell";
import DashboardLayout from "./DashboardLayout";
import { useSession } from "next-auth/react";

export default function Dashboard() {
    //TODO add guards.

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
