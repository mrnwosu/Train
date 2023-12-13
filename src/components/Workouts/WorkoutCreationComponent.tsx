import { api } from "~/utils/api";
import { useState } from "react";
import _, { create } from "lodash";
import { type Movement } from "@prisma/client";
import { ApiError } from "next/dist/server/api-utils";
import { isConstructorDeclaration } from "typescript";

export default function WorkoutCreationComponent() {
  const [movementSearch, setMovementSearch] = useState<string>("");
  const [onlyHiit, setOnlyHiit] = useState<boolean>(false);
  const [currentBodyPart, setCurrentBodyPart] = useState<string>("");
  const [movementsForNewWorkout, setMovementsForNewWorkout] = useState<
    Movement[]
  >([]);

  console.log("rendered", {
    movementSearch,
    currentBodyPart,
    movementsForNewWorkout,
  });

  const workouts = api.workout.getWorkouts.useQuery();
  const allMovements = api.movement.getMovements.useQuery({
    targetMuscleGroups: "All",
  });
  const movementsForSearch = api.movement.getMovements.useQuery({
    targetMuscleGroups: currentBodyPart,
    searchQuery: movementSearch,
    onlyHitt: onlyHiit,
  });

  const { mutate: createWorkoutMutation } =
    api.workout.createWorkout.useMutation();

  const { mutate: deleteWorkoutMutation } =
    api.workout.deleteWorkout.useMutation();

  console.log({
    data: allMovements.data,
    uniq: _.uniqBy(allMovements.data, "targetMuscleGroups"),
    anotherOne: _.uniqBy(allMovements.data, "targetMuscleGroups").map(
      (m) => m.targetMuscleGroups,
    )
  })
  const bodyParts = [
    "All",
    ...(_.uniqBy(allMovements.data, "targetMuscleGroups").map(
      (m) => m.targetMuscleGroups,
    ) ?? []),
  ];

  function createWorkout(): void {
    const form = document.getElementById("new-workout-form") as HTMLFormElement;
    const formData = new FormData(form);
    if (movementsForNewWorkout.length === 0) return; //Show error message

    const workoutName = formData.get("workout-name");
    const numberOfSets = Number(formData.get("number-of-sets"));
    const timedSets = formData.get("timed-sets") === "on";

    if (!workoutName || !numberOfSets) return; //Show error message

    createWorkoutMutation({
      workoutName: workoutName as string,
      secondsBetweenSets: timedSets
        ? Number(formData.get("seconds-between-sets"))
        : undefined,
      secondsDuringReps: timedSets
        ? Number(formData.get("seconds-during-reps"))
        : undefined,
      sets: numberOfSets,
      movements: movementsForNewWorkout,
      notes: "This is a note",
    });

    console.log(formData.get("number-of-sets"));
  }

  return (
    <div className=" flex w-full flex-col items-baseline gap-4 text-black">
      <h1 className=" text-xl text-white">Workout Creation</h1>
      {!workouts.data || workouts.data.length == 0 ? (
        <p className=" text-white">No Workouts</p>
      ) : (
        workouts.data.map((workout) => {
          return (
            <div
              className=" flex w-5/6 flex-row justify-between text-yellow-100"
              key={workout.id}
            >
              <p>{workout.workoutName}</p>
              <i
                data-workoutId={workout.id}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  const workoutId = Number(target.dataset.workoutId);
                  console.log("Deleting workout", { workoutId });
                  deleteWorkoutMutation({ workoutId });
                }}
              >
                X
              </i>
            </div>
          );
        })
      )}

      <div className="h-1 w-4/5 bg-slate-700"></div>
      <h1 className=" text-white">New Workout</h1>
      <div className=" flex w-full">
        <form id="new-workout-form" className=" flex w-4/5 flex-col gap-4">
          {/* Workout name */}
          <div>
            <input type="text" name="workout-name" placeholder="Workout Name" />
          </div>
          {/* Movement Selections */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between gap-2">
              {workouts && (
                <select onChange={(e) => setCurrentBodyPart(e.target.value)}>
                  {bodyParts?.map((bodyPart, index) => {
                    return (
                      <option key={bodyPart + index} value={bodyPart}>
                        {bodyPart}
                      </option>
                    );
                  })}
                </select>
              )}
              <input
                type="text"
                placeholder="Movement Search"
                onChange={(e) => setMovementSearch(e.target.value)}
                value={movementSearch}
              />
              <label className=" text-white" htmlFor="hiit-only">HIIT Only</label>
              <input
                type="checkbox"
                name="hiit-only"
                onChange={(e) => setOnlyHiit(e.target.checked)}
              />
            </div>
            <div>
              <select
                onChange={(e) => {
                  const movement = movementsForSearch.data?.find(
                    (m) => m.id === Number(e.target.value),
                  );
                  if (!movement) return;
                  console.log("Adding movement to workout", { movement });
                  setMovementsForNewWorkout([
                    ...movementsForNewWorkout,
                    movement,
                  ]);
                }}
              >
                {movementsForSearch.data?.map((movement) => {
                  return (
                    <option key={movement.id} value={movement.id}>
                      {movement.movementName}
                    </option>
                  );
                })}
              </select>
            </div>
            {movementsForNewWorkout && (
              <div className=" flex h-32 w-full flex-col gap-2 overflow-scroll text-white">
                {movementsForNewWorkout.map((movement) => {
                  return (
                    <div
                      className=" flex flex-row justify-between transition duration-75 hover:text-yellow-400 "
                      key={movement.id}
                    >
                      <div>
                        <p>{movement.movementName}</p>
                      </div>
                      <div>
                        <i
                          onClick={(e) => {
                            const target = e.target as HTMLInputElement;
                            const movementId = Number(
                              target.dataset.cancelMovement,
                            );
                            setMovementsForNewWorkout(
                              movementsForNewWorkout.filter(
                                (m) => m.id !== movementId,
                              ),
                            );
                          }}
                          data-cancel-movement={movement.id}
                        >
                          X
                        </i>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Workout details */}
          <div className=" flex flex-col gap-2">
            <div className=" flex flex-row justify-between gap-2">
              <div className="flex justify-between gap-2">
                <label className=" text-white" htmlFor="number-of-sets">
                  Number of Sets
                </label>
                <input
                  type="number"
                  name="number-of-sets"
                  placeholder="Number of Sets"
                  className=" w-12"
                  defaultValue={4}
                />
              </div>
              <label className=" text-white" htmlFor="timed-sets">
                Timed Sets?
              </label>
              <input
                type="checkbox"
                name="timed-sets"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  const form = document.getElementById(
                    "timedSetsBox",
                  ) as HTMLDivElement;
                  if (target.checked) {
                    form?.classList.remove("opacity-0");
                  } else {
                    form?.classList.add("opacity-0");
                  }
                }}
              />
            </div>
            {/* Timed Sets */}
            <div
              id="timedSetsBox"
              className=" flex flex-col justify-between gap-2 opacity-0 transition duration-100 [&>label]:text-white"
            >
              <div className=" flex flex-row justify-between gap-2">
                <label className=" text-white" htmlFor="seconds-between-sets">
                  Seconds Between Sets
                </label>
                <input
                  type="number"
                  name="seconds-between-sets"
                  className=" w-12"
                  defaultValue={30}
                />
              </div>
              <div className=" flex flex-row justify-between gap-2">
                <label className=" text-white" htmlFor="seconds-during-reps">
                  Seconds During Reps
                </label>
                <input
                  type="number"
                  name="seconds-during-reps"
                  className=" w-12"
                  defaultValue={60}
                />
              </div>
            </div>
          </div>
          <button
            className=" rounded-sm border-2 bg-zinc-600 p-2 text-zinc-200"
            onClick={(e) => {
              e.preventDefault();
              createWorkout();
            }}
          >
            Create Workout
          </button>
        </form>
      </div>
    </div>
  );
}
