// ScorecardItem.tsx
import { Scorecard, HoleScore } from "@prisma/client";
import React from "react";
import { formatDate } from "@/app/lib/utils";
import { fetchHoleScoresByScorecardId } from "@/app/lib/data";

interface ScorecardItemProps {
  scorecard: Scorecard;
}

export default async function ScorecardItem({ scorecard }: ScorecardItemProps) {
  const holeScores: HoleScore[] = await fetchHoleScoresByScorecardId(
    scorecard.id,
  );
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="mb-2">
        <h3 className="text-lg text-gray-500 font-semibold">
          {scorecard.courseName}
        </h3>
      </div>
      <div className="text-2xl text-gray-500 font-bold mb-4">
        Score: {scorecard.score}
      </div>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 mb-2">
          {holeScores.map((holeScore) => (
            <div
              key={holeScore.holeNumber}
              className="flex flex-col items-center"
            >
              <span className="text-sm text-gray-500">
                Hole {holeScore.holeNumber}
              </span>
              <span className="text-lg text-gray-500 font-semibold">
                {holeScore.score}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        {formatDate(scorecard.createdAt)}
      </p>
    </div>
  );
}
