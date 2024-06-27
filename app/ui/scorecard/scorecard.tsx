"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Course, Player } from "@prisma/client";
import { createScorecard } from "@/app/lib/actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type ScoreCardProps = {
  course: Course;
  players: Player[];
};

type ScoreData = {
  [playerId: number]: number[];
};

export default function ScoreCard({ course, players }: ScoreCardProps) {
  const [scores, setScores] = useState<ScoreData>(
    players.reduce((acc, player) => {
      acc[player.id] = Array(course.numHoles).fill(0);
      return acc;
    }, {} as ScoreData),
  );
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const handleScoreChange = (
    playerId: number,
    holeIndex: number,
    score: number,
  ) => {
    setScores((prevScores) => ({
      ...prevScores,
      [playerId]: prevScores[playerId].map((s, i) =>
        i === holeIndex ? score : s,
      ),
    }));
  };

  const isFormValid = () => {
    return Object.values(scores).every((playerScores) =>
      playerScores.every((score) => score > 0),
    );
  };

  useEffect(() => {
    if (isRedirecting) {
      redirect("/");
    }
  }, [isRedirecting]);

  const handleSubmit = (formData: FormData) => {
    if (!isFormValid()) {
      alert("Please fill in all scores before submitting.");
      return;
    }

    formData.append("players", JSON.stringify(players));
    formData.append("scores", JSON.stringify(scores));

    startTransition(() => {
      createScorecard(course.id.toString(), formData).then((result) => {
        if (result.success) {
          toast.success("Scorecard submitted successfully!");
          setIsRedirecting(true);
        } else {
          toast.error(result.error || "Failed to submit scorecard.");
        }
      });
    });
  };

  return (
    <form action={handleSubmit} className="p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 h-16">Player</th>
            {Array.from({ length: course.numHoles }, (_, i) => (
              <th key={i} className="border p-2 h-16">
                Hole {i + 1}
              </th>
            ))}
            <th className="border p-2 h-16">Total</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="border p-2 h-20">{player.name}</td>
              {scores[player.id].map((score, holeIndex) => (
                <td key={holeIndex} className="border p-2 h-20">
                  <input
                    type="number"
                    value={score}
                    onChange={(e) =>
                      handleScoreChange(
                        player.id,
                        holeIndex,
                        parseInt(e.target.value) || 0,
                      )
                    }
                    className="w-full p-1 h-full text-center text-black text-xl"
                    min="1"
                  />
                </td>
              ))}
              <td className="border p-2 h-20 text-center text-xl">
                {scores[player.id].reduce((sum, score) => sum + score, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={!isFormValid() || isPending}
      >
        {isPending ? "Submitting..." : "Submit Scorecard"}
      </button>
    </form>
  );
}
