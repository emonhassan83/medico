/*
  Warnings:

  - Made the column `contactNumber` on table `admins` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "address" TEXT,
ALTER COLUMN "contactNumber" SET NOT NULL;

-- AlterTable
ALTER TABLE "receptionist" ADD COLUMN     "address" TEXT;
