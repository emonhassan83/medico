/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `patientHealthData` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `patientHealthData` table. All the data in the column will be lost.
  - You are about to drop the `JobDocument` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coverLater` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvResume` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `finance_manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `finance_manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification` to the `finance_manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `lab_tech` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `lab_tech` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification` to the `lab_tech` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `nurses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `nurses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification` to the `nurses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `pharmacists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `pharmacists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification` to the `pharmacists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `receptionist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `receptionist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification` to the `receptionist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `report_analyst` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `report_analyst` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification` to the `report_analyst` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `support` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `support` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification` to the `support` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JobDocument" DROP CONSTRAINT "JobDocument_jobApplicationId_fkey";

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "coverLater" TEXT NOT NULL,
ADD COLUMN     "cvResume" TEXT NOT NULL,
ADD COLUMN     "documents" JSONB,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "socialUrl" TEXT[];

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "finance_manager" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "qualification" TEXT NOT NULL,
ADD COLUMN     "specialization" TEXT[],
ADD COLUMN     "yearsOfExperience" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "job_posts" ADD COLUMN     "salaryRange" TEXT,
ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "lab_tech" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "qualification" TEXT NOT NULL,
ADD COLUMN     "specialization" TEXT[],
ADD COLUMN     "yearsOfExperience" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "nurses" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "qualification" TEXT NOT NULL,
ADD COLUMN     "specialization" TEXT[],
ADD COLUMN     "yearsOfExperience" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "patientHealthData" DROP COLUMN "dateOfBirth",
DROP COLUMN "gender";

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "pharmacists" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "qualification" TEXT NOT NULL,
ADD COLUMN     "specialization" TEXT[],
ADD COLUMN     "yearsOfExperience" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "receptionist" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "qualification" TEXT NOT NULL,
ADD COLUMN     "specialization" TEXT[],
ADD COLUMN     "yearsOfExperience" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "report_analyst" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "qualification" TEXT NOT NULL,
ADD COLUMN     "specialization" TEXT[],
ADD COLUMN     "yearsOfExperience" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "support" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "qualification" TEXT NOT NULL,
ADD COLUMN     "specialization" TEXT[],
ADD COLUMN     "yearsOfExperience" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "JobDocument";
