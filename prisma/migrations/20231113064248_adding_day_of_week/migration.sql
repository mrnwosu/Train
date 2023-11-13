/*
  Warnings:

  - Added the required column `dayOfWeek` to the `WorkoutUserMap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutUserMap" ADD COLUMN     "dayOfWeek" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT;
