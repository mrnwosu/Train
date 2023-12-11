import { api } from "~/utils/api";
import DashboardLayout from "./DashboardLayout";
import { $Enums, type User, type Workout } from "@prisma/client";
import { useRef } from "react";
import {
  returnDayOfWeek,
  toggleClassForAllElementsByClass,
  toggleClassForElement,
} from "~/utils/uiHelper";
import _ from "lodash";
import { AssignmentsForClientComponent } from "../../components/Workouts/AssignmentsForClientComponent";

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
  const workouts = api.workout.getWorkouts.useQuery();
  const clients = api.user.getUsers.useQuery({
    role: $Enums.Role.CLIENT,
  });

  const createNewAssignmentMutation =
    api.workout.createWorkoutAssignment.useMutation();

  const hasAssignments =
    currentAssignments &&
    currentAssignments.data &&
    currentAssignments.data?.length > 0;
  const vms: {
    client: User | undefined;
    assignmentList: {
      id: number | undefined;
      workout: Workout | undefined;
      dayOfWeek: string | undefined;
      notes: string | null;
    }[];
  }[] = [];

  const assignmentsByClient = _.groupBy(currentAssignments.data, "clientId");
  Object.keys(assignmentsByClient).forEach((clientId) => {
    if (
      !clientId ||
      !assignmentsByClient?.[clientId] ||
      assignmentsByClient[clientId]?.length === 0 ||
      !assignmentsByClient[clientId]?.[0]?.client?.name
    ) {
      return;
    }

    const client = assignmentsByClient[clientId]?.[0]?.client;
    const assginmentList = assignmentsByClient[clientId];

    vms.push({
      client,
      assignmentList:
        assginmentList?.map((assignment) => {
          const date = returnDayOfWeek(assignment.dayOfWeek);
          const formattedDate = date.toLocaleString(
            'en-US',
            { weekday: 'long', month: 'numeric', day: 'numeric', year: 'numeric' }
          );

          return {
            workout: assignment.workout,
            dayOfWeek: formattedDate,
            id: assignment.id,
            notes: assignment.notes,
          };
        }) ?? [],
    });
  });

  console.log({ vms, assignmentsByClient });

  console.log({ currentAssignments, hasAssignments });

  return (
    <DashboardLayout>
      <div className=" flex flex-row gap-4">
        <div>
          {!hasAssignments && (
            <p className=" text-xl">No Current Assignments</p>
          )}
          {hasAssignments && <p className=" text-xl">Current Assignments</p>}
          <div className=" mb-2 mt-1 h-1 bg-red-600"></div>
          {hasAssignments && (
            <div className=" flex flex-col gap-2">
              {vms.map((vm) => {
                return (
                  <AssignmentsForClientComponent
                    key={`client_${vm.client?.id}`}
                    client={vm.client}
                    assignments={vm.assignmentList}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div>
            <h1 className=" text-xl">Assign Workouts</h1>
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
                        toggleClassForAllElementsByClass(
                          "dayOfWeek",
                          "bg-zinc-700",
                          "bg-yellow-900",
                        );
                        const thisElement = e.target as HTMLDivElement;
                        toggleClassForElement(
                          thisElement,
                          "bg-yellow-900",
                          "bg-zinc-700",
                        );
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
                    toggleClassForAllElementsByClass(
                      "dayOfWeek",
                      "bg-yellow-900",
                      "bg-zinc-700",
                    );
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
