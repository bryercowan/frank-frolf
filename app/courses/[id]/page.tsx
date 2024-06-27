import { Suspense } from "react";
import { SelectSkeleton } from "@/app/ui/skeletons";
import AddPlayerForm from "@/app/ui/player/add-player-form";
import PlayerSelectorServer from "@/app/ui/player/player-selector-server";
import { fetchCourseById } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const course = await fetchCourseById(Number(params.id));
  return (
    <div className="z-10 items-center justify-between font-mono text-sm lg:flex">
      <div className="min-h-screen w-screen flex flex-col items-center justify-center">
        <div className="w-full h-36 text-center">
          <h1 className="text-5xl">Playing Course: {course.name}</h1>
        </div>
        <div className="grid lg:grid-cols-2 grid-flow-row gap-10 w-full p-10 md:grid-cols-1">
          <div className="w-full">
            <h1 className="text-3xl font-semibold text-center mb-3">
              Select Players
            </h1>
            <Suspense
              fallback={
                <SelectSkeleton
                  label={"Select Players"}
                  option={"Select a player"}
                />
              }
            >
              <PlayerSelectorServer courseId={course.id} />
            </Suspense>
          </div>
          <div>
            <AddPlayerForm params={params} />
          </div>
        </div>
      </div>
    </div>
  );
}
