"use client";

import { useRouter } from "next/navigation";
import { Player } from "@prisma/client";

export default function PlayerSelect({ players }: { players: Player[] }) {
  const router = useRouter();

  const handlePlayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const playerId = event.target.value;
    if (playerId) {
      router.push(`/scorecards/${playerId}`);
    }
  };

  return (
    <select
      onChange={handlePlayerChange}
      className="block w-full p-2 border border-gray-300 rounded-md"
    >
      <option value="">Select a player</option>
      {players.map((player) => (
        <option key={player.id} value={player.id}>
          {player.name}
        </option>
      ))}
    </select>
  );
}
