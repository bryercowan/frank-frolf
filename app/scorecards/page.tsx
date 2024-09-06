import { Suspense } from "react";
import { ScorecardListSkeleton } from "@/app/ui/skeletons";
import ScorecardList from "@/app/scorecards/scorecard-list";
import ExportToCsvButton from "@/app/ui/export-to-csv-button";
import PlayerSelect from "@/app/ui/player/player-select";
import { Player } from "@prisma/client";
import { fetchPlayers } from "@/app/lib/data";

export default async function Page() {
  const players: Player[] = await fetchPlayers();
  return (
    <main className="flex min-h-screen min-w flex-col items-center justify-between">
      <div className="z-10 items-center justify-between font-mono text-sm lg:flex">
        <div className="min-h-screen w-screen flex flex-col items-center justify-center">
          <div className="grid lg:grid-cols-1 grid-flow-row gap-10 p-10">
            <div className="justify-center">
              <h1 className="text-3xl font-semibold mb-4">Past Scorecards</h1>
              <PlayerSelect players={players} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
