import { api } from "~/utils/api";
import DashboardLayout from "./DashboardLayout";
import { useSession } from "next-auth/react";
import { $Enums } from "@prisma/client";

export default function Workouts() {
  const workoutData = api.workout.getWorkouts.useQuery();
  const movementData = api.movement.getMovements.useQuery();

  const workouts = workoutData.data ?? [];
  const movements = movementData.data ?? [];
  const { data: sessionData } = useSession();
  const user = api.user.getUser.useQuery({ id: sessionData?.user?.id ?? "" });
  const generateMovements = api.movement.generateMovements.useMutation();

  const isTrainer = user?.data?.role === $Enums.Role.TRAINER;

  return (
    <DashboardLayout>
      <div>
        {isTrainer && <h1>This is a trainer</h1>}
        <h1></h1>
        <h1>Movements</h1>
        {movements.length > 0 ? (
          movements.map((movement) => {
            return (
              <div key={`${movement.movementName}_${movement.id}`}>
                <h1>{movement.movementName}</h1>
                <p>{movement.categoryName}</p>
                {movement.literalMusclesAffected && (
                  <p>{movement.literalMusclesAffected}</p>
                )}
              </div>
            );
          })
        ) : (
          <p>No Movements</p>
        )}
        <form id="movementGeneratorForm" className=" flex flex-row gap-4 text-black">
          <input
            type="text"
            name="movementMuscleGroup"
            placeholder="Main Muscle Group Name"
            defaultValue={"Chest"}
          />
          <input type="number" defaultValue={1} name="movementGeneratingNumber" placeholder="Count" />
          <button
            className=" hover:text-yellow-600 text-white"
            onClick={(e) => {
              e.preventDefault();
              const form = document.getElementById("movementGeneratorForm") as HTMLFormElement
              if(!form) {
                console.error("Form not found")
                return
              }
              const formData = new FormData(form)
              const data = Object.fromEntries(formData.entries())
              const majorBodyPart = (data.movementMuscleGroup ?? "Chest") as string
              const numberOfMovements = parseInt((data.movementGeneratingNumber as string ?? "1"))

              generateMovements.mutate({
                majorBodyPart: majorBodyPart,
                numberOfMovements: numberOfMovements,
              })
              // Enable button after getting result
            }}
          >
            Generate Movements
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
