import { api } from "~/utils/api";
import { useState } from "react";
import { UserSelect } from "../../components/UserSelect";
import _ from "lodash";
import { Movement } from "@prisma/client";

export function WorkoutCreationComponent() {
  const [workoutSearch, setWorkoutSearch] = useState<string>("");
  const [currentBodyPart, setCurrentBodyPart] = useState<string>("");
  const [movementsForNewWorkout, setMovementsForNewWorkout] = useState<
    Movement[]
  >([]);

  const workouts = api.workout.getWorkouts.useQuery();
  const allMovements = api.movement.getMovements.useQuery({
    targetMuscleGroups: "All",
  });
  const movementsForSearch = api.movement.getMovements.useQuery({
    targetMuscleGroups: currentBodyPart,
  });
  const bodyParts = [
    "All",
    ...(_.uniqBy(allMovements.data, "targetMuscleGroups").map(
      (m) => m.targetMuscleGroups,
    ) ?? []),
  ];

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
      <div className=" flex flex-row gap-4">
        <select onChange={(e) => setCurrentBodyPart(e.target.value)}>
          {bodyParts?.map((bodyPart, index) => {
            return (
              <option key={bodyPart + index} value={bodyPart}>
                {bodyPart}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          onChange={(e) => setWorkoutSearch(e.target.value)}
          value={workoutSearch}
        />
      </div>

      <select
        onChange={(e) => {
          const movement = movementsForSearch.data?.find(
            (m) => m.id === Number(e.target.value),
          );
          if (!movement) return;
          console.log("Adding movement to workout", { movement });
          setMovementsForNewWorkout([...movementsForNewWorkout, movement]);
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
      {movementsForNewWorkout && (
        <div className=" flex w-full flex-col gap-2 text-white">
          {movementsForNewWorkout.map((movement) => {
            return (
              <div className=" flex flex-row " key={movement.id}>
                <div className="w-4/5">
                  <p>{movement.movementName}</p>
                </div>
                <div className="w-1/5">
                  <i onClick={(e) => {
                    const target = e.target as HTMLInputElement;
                    const movementId = Number(target.dataset.cancelMovement);
                    setMovementsForNewWorkout(
                      movementsForNewWorkout.filter((m) => m.id !== movementId),
                    );
                  }} data-cancel-movement={movement.id}>X</i>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
