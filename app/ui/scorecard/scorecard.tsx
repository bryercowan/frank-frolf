"use client";

import React, { useState, useTransition } from "react";
import { Course, Player } from "@prisma/client";
import { createScorecard } from "@/app/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchScorecardByPlayerId } from "@/app/lib/data";

type ScoreCardProps = {
  course: Course;
  players: Player[];
};

type ScoreData = Record<number, number[]>;

export default function ScoreCard({ course, players }: ScoreCardProps) {
  const router = useRouter();
  const [scores, setScores] = useState<ScoreData>(
    players.reduce((acc, player) => {
      acc[player.id] = Array(course.numHoles).fill(0);
      return acc;
    }, {} as ScoreData),
  );
  const [isPending, startTransition] = useTransition();

  const handleScoreChange = async (
    playerId: number,
    holeIndex: number,
    score: number,
  ) => {
    setScores((prev) => ({
      ...prev,
      [playerId]: prev[playerId].map((s, i) => (i === holeIndex ? score : s)),
    }));
  };

  const isFormValid = () =>
    Object.values(scores).every((playerScores) =>
      playerScores.every((score) => score > 0),
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill in all scores before submitting.");
      return;
    }

    startTransition(() => {
      const formData = new FormData();
      formData.append("players", JSON.stringify(players));
      formData.append("scores", JSON.stringify(scores));

      createScorecard(course.id.toString(), formData).then((result) => {
        if (result.success) {
          toast.success("Scorecard submitted successfully!");
          router.push("/");
        } else {
          toast.error(result.error || "Failed to submit scorecard.");
        }
      });
    });
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-gray-600 font-semibold">
                  Player
                </th>
                {Array.from({ length: course.numHoles }, (_, i) => (
                  <th
                    key={i}
                    className="p-3 text-center text-gray-600 font-semibold"
                  >
                    {i + 1}
                  </th>
                ))}
                <th className="p-3 text-center text-gray-600 font-semibold">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-t border-gray-200">
                  <td className="p-5 font-medium text-gray-800">
                    {player.name}
                  </td>
                  {scores[player.id].map((score, holeIndex) => (
                    <td key={holeIndex} className="p-2">
                      <input
                        type="number"
                        value={score || ""}
                        onChange={(e) =>
                          handleScoreChange(
                            player.id,
                            holeIndex,
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-full p-1 h-full border-neutral-300 border-2 text-center text-black text-xl"
                        min="1"
                      />
                    </td>
                  ))}
                  <td className="p-3 text-center font-semibold text-lg text-gray-800">
                    {scores[player.id].reduce((sum, score) => sum + score, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
            disabled={!isFormValid() || isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
