-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numHoles" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scorecard" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "Scorecard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HoleScore" (
    "id" SERIAL NOT NULL,
    "holeNumber" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "scorecardId" INTEGER NOT NULL,

    CONSTRAINT "HoleScore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scorecard" ADD CONSTRAINT "Scorecard_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scorecard" ADD CONSTRAINT "Scorecard_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HoleScore" ADD CONSTRAINT "HoleScore_scorecardId_fkey" FOREIGN KEY ("scorecardId") REFERENCES "Scorecard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
