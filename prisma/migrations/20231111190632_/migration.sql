/*
  Warnings:

  - You are about to drop the column `breakReps` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `breakSets` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `timeDuringReps` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `creatorUserId` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "breakReps",
DROP COLUMN "breakSets",
DROP COLUMN "timeDuringReps",
DROP COLUMN "userId",
ADD COLUMN     "creatorUserId" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "secondsBetweenSets" INTEGER,
ADD COLUMN     "secondsDuringReps" INTEGER;

-- CreateTable
CREATE TABLE "WorkoutUserMap" (
    "id" SERIAL NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "assignedByTrainerId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutUserMap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_creatorUserId_fkey" FOREIGN KEY ("creatorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutUserMap" ADD CONSTRAINT "WorkoutUserMap_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutUserMap" ADD CONSTRAINT "WorkoutUserMap_assignedByTrainerId_fkey" FOREIGN KEY ("assignedByTrainerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutUserMap" ADD CONSTRAINT "WorkoutUserMap_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
