/*
  Warnings:

  - You are about to drop the `WhiteListedEmail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WhiteListedEmail";

-- CreateTable
CREATE TABLE "WhitelistedEmail" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "WhitelistedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhitelistedEmail_email_key" ON "WhitelistedEmail"("email");
