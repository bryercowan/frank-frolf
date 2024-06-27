import React from "react";
import { fetchPlayers } from "@/app/lib/data";
import PlayerSelector from "@/app/ui/player/player-selector-client";
export default async function PlayerSelectorServer({
  courseId,
}: {
  courseId: number;
}) {
  const players = await fetchPlayers();
  return (
    <>
      <div className="mb-4">
        <label htmlFor="course" className="mb-2 block text-lg font-medium">
          Choose Players
        </label>
        <PlayerSelector players={players} courseId={courseId} />
      </div>
    </>
  );
}
