/*
  Warnings:

  - You are about to drop the column `completed` on the `WorkoutUserMap` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `WorkoutUserMap` table. All the data in the column will be lost.
  - Changed the type of `dayOfWeek` on the `WorkoutUserMap` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WorkoutUserMap" DROP COLUMN "completed",
DROP COLUMN "completedAt",
DROP COLUMN "dayOfWeek",
ADD COLUMN     "dayOfWeek" INTEGER NOT NULL;
