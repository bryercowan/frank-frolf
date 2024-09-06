// app/ui/scorecard-list.tsx
import { Scorecard, Player } from "@prisma/client";
import ScorecardItem from "@/app/scorecards/scorecard-item";
import ExportToCsvButton from "@/app/ui/export-to-csv-button";

export default async function ScorecardList({
  scorecards,
  players,
}: {
  scorecards: Scorecard[];
  players: Player[];
}) {
  if (scorecards.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-rows-1 lg:grid-cols-2">
        {scorecards.map((scorecard) => {
          return <ScorecardItem key={scorecard.id} scorecard={scorecard} />;
        })}
      </div>
      <div className="mt-6">
        <ExportToCsvButton scorecards={scorecards} players={players} />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-2xl text-gray-500">No scorecards found.</p>
    </div>
  );
}
