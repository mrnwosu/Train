import { api } from "~/utils/api";
import DashboardLayout from "./DashboardLayout";
import { $Enums, Movement, Workout } from "@prisma/client";

export default function Assignments() {
  const currentAssignments = api.workout.getCurrentAssignments.useQuery({});
  const workouts = api.workout.getWorkouts.useQuery();
  const hasAssignments =
    currentAssignments &&
    currentAssignments.data &&
    currentAssignments.data?.length > 0;

  const clients = api.user.getUsers.useQuery({
    role: $Enums.Role.CLIENT,
  });
  console.log({ currentAssignments, hasAssignments });

  return (
    <DashboardLayout>
      <div className=" flex flex-col">
        <div>
          {!hasAssignments && (
            <p className=" text-xl">No Current Assignments</p>
          )}
          {hasAssignments && <p className=" text-xl">Current Assignments</p>}
          <div className=" mb-2 mt-1 h-1 bg-red-600"></div>
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
        <div>
          <div>
            <h1 className=" mt-10 text-xl">Assign Workouts</h1>
            <div className=" mb-2 mt-1 h-1 bg-red-600"></div>
            <form className="flex flex-col gap-2">
              <select name="workout-name" className=" text-black">
                {workouts.data?.map((workout) => {
                  return (
                    <option key={workout.id} value={workout.id}>
                      {workout.workoutName}
                    </option>
                  );
                })}
              </select>
              <select name="day-of-week" className=" text-black">
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesay</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
              <select name="client-name" className=" text-black">
                {clients.data?.map((client) => {
                  return (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  );
                })}
              </select>
              <button type="submit" className=" text-white bg-zinc-600 border-2 border-yellow-950 rounded-sm">
                Assign
              </button>
            </form>
            {/* {workouts.data?.map((workout) => {
              return (
                <WorkoutComponent
                  key={workout.id}
                  workout={workout}
                  movements={workout.movements}
                />
              );
            })} */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function WorkoutComponent({
  workout,
  movements,
}: {
  workout: Workout;
  movements: Movement[];
}) {
  return (
    <div className=" bg-zinc-900">
      <h1 className=" border-b-2 border-yellow-800 px-2 text-lg text-yellow-100 ">
        {workout.workoutName}
      </h1>
      <div className="transition  [&>div:nth-child(even)]:bg-zinc-800 [&>div:nth-child(odd)]:bg-zinc-700">
        <div className="">
          {movements.map((movement) => {
            return (
              <div className="  " key={movement.id}>
                <p>{movement.movementName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
