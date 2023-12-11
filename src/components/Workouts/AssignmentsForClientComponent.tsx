import { type User, type Workout } from "@prisma/client";


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
    <div className=" flex flex-col gap-2 rounded-md border-2 border-zinc-800 bg-zinc-700">
      <p className="px-2">{client?.name}</p>
      {assignments.map((assignment) => {
        return (
          <div key={`assignment_${assignment.id}`}>
            <p className=" bg-black px-2 pb-1">
              {assignment.workout?.workoutName}
            </p>
            <p>Next Workout: {assignment.dayOfWeek}</p>
            {assignment.notes && (
              <div className=" overflow-scroll rounded bg-zinc-800 p-4 text-white">
                <p className=" text-white">{assignment.notes}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
