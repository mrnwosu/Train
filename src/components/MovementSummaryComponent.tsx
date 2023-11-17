import { type Movement } from "@prisma/client";
import { useRef } from "react";
import { toggleClassForId } from "~/utils/uiHelper";


export function MovementSummaryComponent(props: { movement: Movement; }) {
  const { movement } = props;
  const isShowingDetails = useRef(false);
  const showMovementDetails = () => {
    console.log({ isShowingDetails });
    if (isShowingDetails.current) {
      isShowingDetails.current = false;
      toggleClassForId(`movement-details-toggle-${movement.id}`, "rotate-0", "rotate-90");
      toggleClassForId(`movement-datails-${movement.id}`, "h-0", "h-16");
    } else {
      isShowingDetails.current = true;
      toggleClassForId(`movement-details-toggle-${movement.id}`, "rotate-90", "rotate-0");
      toggleClassForId(`movement-datails-${movement.id}`, "h-16", "h-0");
    }
  };

  return (
    <div className=" flex flex-col gap-2">
      <div className="flex flex-row gap-4">
        <i
          id={`movement-details-toggle-${movement.id}`}
          onClick={showMovementDetails}
          className=" font-bold transition duration-300"
        >{`>`}</i>
        <h1 className=" text-lg">{movement.movementName}</h1>
      </div>
      <div
        id={`movement-datails-${movement.id}`}
        className=" movement-summary-detail flex h-0 flex-col gap-2 overflow-hidden pl-7 transition duration-300"
      >
        <div className=" flew-row flex gap-2">
          <p>Target Muscle Group: </p>
          <p>{movement.targetMuscleGroups}</p>
        </div>
        <div className=" flew-row flex gap-2">
          <p>Muscles Affected: </p>
          <p>{movement.literalMusclesAffectedCommonNames.join(" ")}</p>
        </div>
      </div>
    </div>
  );
}
