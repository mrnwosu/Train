import { DashboardCell } from "~/components/Dasbhoard/DashboardCell";
import DashboardLayout from "./DashboardLayout";

export default function Dashboard() {
  

  return (
    <DashboardLayout>
      <div className=" grid grid-rows-2 flex-wrap grow grid-cols-3 gap-4 p-4">
        <DashboardCell title="Upcoming Workouts" description="This is A Description" colspan={2}>
          <div>random</div>
        </DashboardCell>
        <DashboardCell title="Upcoming Workouts" description="This is A Description">
          <div>random</div>
        </DashboardCell>
        <DashboardCell title="Upcoming Workouts" description="This is A Description">
          <div>random</div>
        </DashboardCell>
        <DashboardCell title="Upcoming Workouts" description="This is A Description">
          <div>random</div>
        </DashboardCell>
        <DashboardCell title="Upcoming Workouts" description="This is A Description">
          <div>random</div>
        </DashboardCell>
      </div>
    </DashboardLayout>
  );
}
