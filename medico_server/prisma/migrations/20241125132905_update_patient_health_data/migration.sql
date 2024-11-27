/*
  Warnings:

  - You are about to drop the `patientHealthsData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "patientHealthsData" DROP CONSTRAINT "patientHealthsData_patientId_fkey";

-- DropTable
DROP TABLE "patientHealthsData";

-- CreateTable
CREATE TABLE "patientHealthData" (
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

    CONSTRAINT "patientHealthData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patientHealthData_patientId_key" ON "patientHealthData"("patientId");

-- AddForeignKey
ALTER TABLE "patientHealthData" ADD CONSTRAINT "patientHealthData_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
