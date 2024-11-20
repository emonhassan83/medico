/*
  Warnings:

  - The values [SUPER_ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `patients` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Made the column `contactNumber` on table `patients` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'UNKNOWN';

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'RECEPTIONIST', 'DOCTOR', 'PATIENT');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "patientHelthDatas" ADD COLUMN     "diet" TEXT,
ADD COLUMN     "pulse" TEXT;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ALTER COLUMN "contactNumber" SET NOT NULL;

-- CreateTable
CREATE TABLE "receptionist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactNumber" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receptionist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "receptionist_id_key" ON "receptionist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "receptionist_email_key" ON "receptionist"("email");

-- AddForeignKey
ALTER TABLE "receptionist" ADD CONSTRAINT "receptionist_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
