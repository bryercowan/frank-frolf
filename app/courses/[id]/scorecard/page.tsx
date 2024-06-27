import { fetchCourseById, fetchPlayerById } from "@/app/lib/data";
import { Suspense } from "react";
import { SelectSkeleton } from "@/app/ui/skeletons";
import PlayerSelectorServer from "@/app/ui/player/player-selector-server";
import AddPlayerForm from "@/app/ui/player/add-player-form";
import ScoreCard from "@/app/ui/scorecard/scorecard";

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: PageProps) {
  const course = await fetchCourseById(Number(params.id));
  const playerIds = searchParams.players
    ? Array.isArray(searchParams.players)
      ? searchParams.players
      : searchParams.players.split(",")
    : [];

  const players = await Promise.all(
    playerIds.map((id) => fetchPlayerById(Number(id))),
  );

  return (
    <div className="z-10 items-center justify-between font-mono text-sm lg:flex">
      <div className="min-h-screen w-screen flex flex-col items-center justify-center">
        <div className="w-full h-36 text-center">
          <h1 className="text-5xl">Playing Course: {course.name}</h1>
        </div>
        <ScoreCard course={course} players={players} />
      </div>
    </div>
  );
}
