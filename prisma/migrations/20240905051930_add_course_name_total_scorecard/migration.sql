/*
  Warnings:

  - Added the required column `courseName` to the `Scorecard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalScore` to the `Scorecard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scorecard" ADD COLUMN     "courseName" TEXT NOT NULL,
ADD COLUMN     "totalScore" INTEGER NOT NULL;
