"use client";

import { exportScorecardsToCsv } from "@/app/lib/actions";
import { Player, Scorecard } from "@prisma/client";

interface ExportToCsvButtonProps {
  scorecards: Scorecard[];
  players: Player[];
}

export default function ExportToCsvButton({
  scorecards,
  players,
}: ExportToCsvButtonProps) {
  const handleExport = async () => {
    const csvPath = await exportScorecardsToCsv(scorecards, players);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = csvPath;
      link.download = "scorecards.csv";
      link.click();
    }, 500);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Export to CSV
    </button>
  );
}
