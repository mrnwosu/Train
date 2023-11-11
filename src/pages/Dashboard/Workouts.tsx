import { api } from "~/utils/api";
import DashboardLayout from "./DashboardLayout";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { $Enums } from "@prisma/client";
import { useEffect, useState } from "react";
import { WorkoutCreationComponent } from "./WorkoutCreationComponent";

export default function Workouts() {
  const [currentMovementFilter, setCurrentMovementFilter] = useState<
    string | undefined
  >(undefined);

  const movementData = api.movement.getMovements.useQuery({
    targetMuscleGroups: currentMovementFilter,
  });
  const workoutData = api.workout.getWorkouts.useQuery();

  const workouts = workoutData.data ?? [];
  const movements = movementData.data ?? [];
  const { data: sessionData } = useSession();
  const user = api.user.getUser.useQuery({ id: sessionData?.user?.id ?? "" });
  const generateMovements = api.movement.generateMovements.useMutation();

  const isTrainer = user?.data?.role === $Enums.Role.TRAINER;
  console.log({ isTrainer });

  return (
    <DashboardLayout>
      <div className=" flex w-full flex-col gap-2  text-white">
        {isTrainer && <h1 className=" text-2xl">Workout & Movement Page</h1>}
        <div className="flex flex-row justify-between">
          <div className=" flex flex-col gap-2 rounded-lg border-2 border-zinc-800 p-4">
            <div className=" flex flex-grow flex-row justify-between">
              <select
                className=" w-32 text-black"
                name="movementMuscleGroup"
                defaultValue={"None"}
                onChange={(e) => {
                  const select = e.target as HTMLSelectElement;
                  setCurrentMovementFilter(select.value);
                }}
              >
                <option value="All"></option>
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Legs">Legs</option>
                <option value="Arms">Arms</option>
                <option value="Core">Core</option>
              </select>
              <p>{movements.length + " Movements"}</p>
            </div>
            <div className=" mt-6 flex h-96 flex-col gap-4 overflow-scroll">
              {movements.length > 0 ? (
                movements.map((movement) => {
                  return (
                    <div
                      className=" flex flex-col gap-2"
                      key={`${movement.movementName}_${movement.id}`}
                    >
                      <h1 className=" text-xl">{movement.movementName}</h1>
                      <div className=" flex flex-row gap-2">
                        {movement.literalMusclesAffected?.map((muscle, i) => {
                          return (
                            <p key={`${movement.id}_${muscle}_${i}`}>
                              {muscle}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No Movements</p>
              )}
            </div>
            <form
              id="movementGeneratorForm"
              className=" mt-4 flex flex-row gap-4 text-black"
            >
              <select
                className=" w-32"
                name="movementMuscleGroup"
                defaultValue={"Chest"}
              >
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Legs">Legs</option>
                <option value="Arms">Arms</option>
                <option value="Core">Core</option>
              </select>
              <input
                className=" w-12"
                type="number"
                defaultValue={1}
                name="movementGeneratingNumber"
                placeholder="Count"
              />
              <button
                className=" rounded-sm bg-slate-100 px-2 text-black transition duration-200 hover:bg-slate-300"
                onClick={(e) => {
                  e.preventDefault();
                  const form = document.getElementById(
                    "movementGeneratorForm",
                  ) as HTMLFormElement;
                  if (!form) {
                    console.error("Form not found");
                    return;
                  }
                  const formData = new FormData(form);
                  const data = Object.fromEntries(formData.entries());
                  const majorBodyPart = (data.movementMuscleGroup ??
                    "Chest") as string;
                  const numberOfMovements = parseInt(
                    (data.movementGeneratingNumber as string) ?? "1",
                  );

                  generateMovements.mutate({
                    majorBodyPart: majorBodyPart,
                    numberOfMovements: numberOfMovements,
                  });
                  // Enable button after getting result
                }}
              >
                Generate Movements
              </button>
            </form>
          </div>
          <div className=" flex w-[36em] flex-col gap-2 rounded-lg border-2 border-zinc-800 p-4">
            <h1>Workout Creation</h1>
            <WorkoutCreationComponent />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}