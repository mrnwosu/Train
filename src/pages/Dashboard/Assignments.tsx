import { api } from "~/utils/api";
import DashboardLayout from "./DashboardLayout";
import { $Enums, type Movement, type Workout } from "@prisma/client";
import { useRef } from "react";
import { returnDayOfWeek } from "~/utils/uiHelper";

export default function Assignments() {
  type NewAssignment = {
    workoutId: number;
    clientId: string;
    dayOfWeek: number;
    notes: string;
  };
  const newAssignmentRef = useRef<NewAssignment>({
    workoutId: -1,
    clientId: "none",
    dayOfWeek: -1,
    notes: "",
  });

  const resetAssignment = () => {
    newAssignmentRef.current = {
      workoutId: -1,
      clientId: "none",
      dayOfWeek: -1,
      notes: "",
    };
  };

  const assignDay = (day: number) => {
    console.log({ day });
    newAssignmentRef.current.dayOfWeek = day;
  };

  const assignWorkout = (workoutId: number) => {
    console.log({ workoutId });
    newAssignmentRef.current.workoutId = workoutId;
  };

  const assignClient = (clientId: string) => {
    console.log({ clientId });
    newAssignmentRef.current.clientId = clientId;
  };

  const updateNotes = (notes: string) => {
    console.log({ notes });
    newAssignmentRef.current.notes = notes;
  };

  const createAssignment = () => {
    console.log({ newAssignment: newAssignmentRef });
    if (newAssignmentRef.current.clientId === "none") {
      alert("Please select a client");
      return;
    }
    if (newAssignmentRef.current.workoutId === -1) {
      alert("Please select a workout");
      return;
    }
    if (newAssignmentRef.current.dayOfWeek === -1) {
      alert("Please select a day of the week");
      return;
    }

    createNewAssignmentMutation.mutate({
      clientId: newAssignmentRef.current.clientId,
      workoutId: newAssignmentRef.current.workoutId,
      dayOfWeek: newAssignmentRef.current.dayOfWeek,
      notes: "",
    });

    resetAssignment();
  };

  const currentAssignments = api.workout.getCurrentAssignments.useQuery({});
  const createNewAssignmentMutation =
    api.workout.createWorkoutAssignment.useMutation();
  const workouts = api.workout.getWorkouts.useQuery();
  const hasAssignments =
    currentAssignments &&
    currentAssignments.data &&
    currentAssignments.data?.length > 0;

  const currentAssignmentViewModels = currentAssignments.data?.map(
    (assignment) => {
      return {
        id: assignment.id,
        workoutName: assignment.workout.workoutName,
        clientName: assignment.client.name,
        dayOfWeek: returnDayOfWeek(assignment.dayOfWeek)?.toLocaleDateString( "en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        notes: assignment.notes,
      };
    }
  );

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
              {currentAssignmentViewModels?.map((assignment) => {
                return (
                  <div key={assignment.id} className=" flex flex-col gap-2 bg-zinc-700 rounded-md border-2 border-zinc-800">
                    <p className="px-2">{assignment.clientName}</p>
                    <p className=" bg-black px-2 pb-1">{assignment.workoutName}</p>
                    {assignment.notes && (
                      <div className=" overflow-scroll rounded bg-zinc-800 p-4 text-white">
                        <p className=" text-white">{assignment.notes}</p>
                      </div>
                    )}
                    {assignment.dayOfWeek && (
                      <div className=" flex flex-row gap-2">
                        <p className=" px-2">Next Workout: </p>
                        <p className=" px-2">{assignment.dayOfWeek}</p>
                      </div>
                    )}
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
              <select
                name="workout-name"
                className=" text-black"
                onChange={(e) => {
                  assignWorkout(parseInt(e.target.value));
                }}
              >
                {workouts.data?.map((workout) => {
                  return (
                    <option key={workout.id} value={workout.id}>
                      {workout.workoutName}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-row gap-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => {
                  return (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        const allDays = document.querySelectorAll(".dayOfWeek");
                        allDays.forEach((day) => {
                          day.classList.remove("bg-yellow-900");
                        });

                        const thisElement = e.target as HTMLDivElement;
                        thisElement.classList.add("bg-yellow-900");

                        assignDay(i);
                      }}
                      data-day_of_week={i}
                      key={`day_of_week_${i}`}
                      className="dayOfWeek w-auto rounded-sm border-y-zinc-600 bg-zinc-700 px-3 py-2 transition hover:border-yellow-700 hover:bg-zinc-600"
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              <select
                name="client-name"
                className=" text-black"
                onChange={(e) => {
                  assignClient(e.target.value);
                }}
              >
                {clients.data?.length === 0 && (
                  <option value={-1}>No Clients</option>
                )}
                {clients.data?.map((client) => {
                  return (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  );
                })}
              </select>
              <textarea
                placeholder="Notes"
                className="p-2 text-black"
                rows={3}
                onChange={(e) => {
                  updateNotes(e.target.value);
                }}
              />
              <div className=" overflow-scroll rounded bg-zinc-800 p-4 text-white">
                <p className=" text-white">{newAssignmentRef.current.notes}</p>
              </div>
              <div className="flex flex-row justify-end gap-2">
                <button
                  type="submit"
                  className=" w-fit rounded border-2 border-yellow-950 p-2 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    const allDays = document.querySelectorAll(".dayOfWeek");
                    allDays.forEach((day) => {
                      day.classList.remove("bg-yellow-900");
                    });
                    resetAssignment();
                  }}
                >
                  Clear
                </button>
                <button
                  disabled={createNewAssignmentMutation.isLoading}
                  type="submit"
                  className=" w-fit rounded border-2 border-yellow-950 bg-zinc-600 p-2 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    createAssignment();
                  }}
                >
                  Assign
                </button>
              </div>
            </form>
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
