import { fetchPlayers, fetchScorecardByPlayerId } from "@/app/lib/data";
import { notFound } from "next/navigation";
import ScorecardList from "@/app/scorecards/scorecard-list";

export default async function Page({
  params,
}: {
  params: { playerId: string };
}) {
  const playerId = parseInt(params.playerId);
  if (isNaN(playerId)) {
    notFound();
  }
  const scorecards = await fetchScorecardByPlayerId(playerId);
  const player = scorecards[0]?.player;
  const players = await fetchPlayers();

  return (
    <main className="flex min-h-screen min-w flex-col items-center justify-between">
      <div className="z-10 items-center justify-between font-mono text-sm lg:flex">
        <div className="min-h-screen w-screen flex flex-col items-center justify-center">
          <div className="grid lg:grid-cols-1 grid-flow-row gap-10 p-10">
            <div className="justify-center">
              <h1 className="text-3xl font-semibold mb-4">
                Past Scorecards For {player.name}
              </h1>
              <ScorecardList scorecards={scorecards} players={players} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
