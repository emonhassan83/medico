/*
  Warnings:

  - You are about to drop the column `apointmentFee` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the `patientHelthDatas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `appointmentFee` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Made the column `contactNumber` on table `receptionist` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "patientHelthDatas" DROP CONSTRAINT "patientHelthDatas_patientId_fkey";

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "apointmentFee",
ADD COLUMN     "appointmentFee" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "receptionist" ALTER COLUMN "contactNumber" SET NOT NULL;

-- DropTable
DROP TABLE "patientHelthDatas";

-- CreateTable
CREATE TABLE "patientHealthsData" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender" NOT NULL,
    "bloodGroup" "BloodGroup" NOT NULL,
    "hasAllergies" BOOLEAN DEFAULT false,
    "hasDiabetes" BOOLEAN DEFAULT false,
    "height" TEXT,
    "weight" TEXT,
    "diet" TEXT,
    "pulse" TEXT,
    "smokingStatus" BOOLEAN DEFAULT false,
    "dietaryPreferences" TEXT,
    "pregnancyStatus" BOOLEAN DEFAULT false,
    "mentalHealthHistory" TEXT,
    "immunizationStatus" BOOLEAN DEFAULT false,
    "hasPastSurgeries" BOOLEAN DEFAULT false,
    "recentAnxiety" BOOLEAN DEFAULT false,
    "recentDepression" BOOLEAN DEFAULT false,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patientHealthsData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patientHealthsData_patientId_key" ON "patientHealthsData"("patientId");

-- AddForeignKey
ALTER TABLE "patientHealthsData" ADD CONSTRAINT "patientHealthsData_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
