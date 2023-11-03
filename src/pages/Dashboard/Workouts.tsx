import { api } from "~/utils/api";
import DashboardLayout from "./DashboardLayout";
import { useState } from "react";
import { Movement } from "@prisma/client";

export default function Workouts() {
  const [movements, setMovements] = useState<Movement[]>([]);
  setMovements(api.movement.getMovements.useQuery()?.data ?? []);
  const generateMovements = api.movement.generateMovement.useMutation();


  return (
    <DashboardLayout>
      <div>
        <h1>Movements</h1>
        {movements.length > 0 ? 
          movements.map((movement) => {
            return (
              <div key={`${movement.movementName}_${movement.id}`}>
                <h1>{movement.movementName}</h1>
                <p>{movement.categoryName}</p>
              </div>
            );
          })
        : (
          <p>No Movements</p>
        )}
        <button
          onClick={() =>
            generateMovements.mutate({
              majorBodyPart: "chest",
              numberOfMovements: 15,
            })
          }
        >
          Generate Movements
        </button>
      </div>
    </DashboardLayout>
  );
}
