import { type User, type Workout } from "@prisma/client";
import { useState } from "react";

export const AssignmentsForClientComponent = (props: {
  client: User | undefined;
  assignments: {
    workout: Workout | undefined;
    dayOfWeek: string | undefined;
    id: number | undefined;
    notes: string | null;
  }[];
}) => {


  

  if (!props?.assignments || props.assignments.length === 0) return <div></div>;
  const { client, assignments } = props;
  return (
    <div className=" flex flex-col gap-2 rounded-md border-2 border-zinc-800">
      <div className={`py-2 px-4 flex flex-row gap-2 bg-yellow-700 hover:bg-yellow-700 active:bg-yellow-600`}>
        <p className="text-xl">🔥:</p>
        <p className="text-xl">{client?.name}</p>
      </div>
    </div>
  );
};
