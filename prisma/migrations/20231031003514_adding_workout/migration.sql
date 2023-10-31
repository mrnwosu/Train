-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutName" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "breakSets" INTEGER,
    "breakReps" INTEGER,
    "timeDuringReps" INTEGER,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovementToWorkout" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovementToWorkout_AB_unique" ON "_MovementToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_MovementToWorkout_B_index" ON "_MovementToWorkout"("B");

-- AddForeignKey
ALTER TABLE "_MovementToWorkout" ADD CONSTRAINT "_MovementToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Movement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovementToWorkout" ADD CONSTRAINT "_MovementToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
