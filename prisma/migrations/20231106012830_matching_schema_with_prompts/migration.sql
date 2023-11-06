-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "catHiit",
DROP COLUMN "literalMuscledAffected",
DROP COLUMN "literalMusclesAffectedCommonName",
DROP COLUMN "targetMuscleGroup",
ADD COLUMN     "canHiit" BOOLEAN NOT NULL,
ADD COLUMN     "literalMusclesAffected" TEXT[],
ADD COLUMN     "literalMusclesAffectedCommonNames" TEXT[],
ADD COLUMN     "targetMuscleGroups" TEXT NOT NULL;
