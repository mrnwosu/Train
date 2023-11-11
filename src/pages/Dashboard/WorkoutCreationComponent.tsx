import { api } from "~/utils/api";
import { useState } from "react";
import { UserSelect } from "../../components/UserSelect";
import _ from "lodash";
import { Movement } from "@prisma/client";

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

  const bodyParts = [
    "All",
    ...(_.uniqBy(allMovements.data, "targetMuscleGroups").map(
      (m) => m.targetMuscleGroups,
    ) ?? []),
  ];

  function createWorkout(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className=" flex w-full flex-col items-baseline gap-4 text-black">
      {!workouts.data || workouts.data.length == 0 ? (
        <p className=" text-white">No Workouts</p>
      ) : (
        workouts.data.map((workout) => {
          return (
            <div key={workout.id}>
              <p>{workout.workoutName}</p>
            </div>
          );
        })
      )}

      <div className="h-1 w-4/5 bg-slate-700"></div>
      <h1 className=" text-white">New Workout</h1>
      <div className=" flex flex-col gap-4">
        {/* Workout name */}
        <div>
          <input type="text" placeholder="Workout Name" />
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
            <label htmlFor="hiit-only">HIIT Only</label>
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
                  <div className=" flex flex-row " key={movement.id}>
                    <div className="w-4/5">
                      <p>{movement.movementName}</p>
                    </div>
                    <div className="w-1/5">
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
            <input
              type="number"
              name="number-of-sets"
              placeholder="Number of Sets"
            />
            <label className=" text-white" htmlFor="timed-sets">
              Timed Sets?
            </label>
            <input type="checkbox" name="timed-sets" onChange={(e) => {}} />
          </div>
          {/* Timed Sets */}
          <div className="flex flex-row justify-between gap-2">
            <input
              type="number"
              name="seconds-between-sets"
              placeholder="Seconds Between Sets"
            />
            <input
              type="number"
              name="seconds-during-reps"
              placeholder="Seconds During Reps"
            />
          </div>
        </div>
        <button
          className=" rounded-sm border-2 bg-zinc-600 p-2 text-zinc-200"
          onClick={createWorkout}
        >
          Create Workout
        </button>
      </div>
    </div>
  );
}
