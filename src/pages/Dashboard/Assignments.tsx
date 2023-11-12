import { api } from "~/utils/api";
import DashboardLayout from "./DashboardLayout";

export default function Assignments() {
  const currentAssignments = api.workout.getCurrentAssignments.useQuery({}, {});

  const hasAssignments =
    !currentAssignments ||
    !currentAssignments.data ||
    currentAssignments.data?.length === 0;

    console.log({currentAssignments, hasAssignments})

  return (
    <DashboardLayout>
      <div>
        {!hasAssignments && <p>No Current Assignments</p>}
        {hasAssignments && (
          <div>
            {currentAssignments.data?.map((assignment) => {
                return (
                    <div key={assignment.id}>
                    <p>{assignment.client.name}</p>
                    <p>{assignment.workout.workoutName}</p>
                    </div>
                );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
