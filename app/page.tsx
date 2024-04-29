import CourseListServer from "@/app/ui/course/course-list.server";
import AddCourseForm from "@/app/ui/course/add-course-form";
import { Suspense } from "react";
import { SelectSkeleton } from "@/app/ui/skeletons";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w flex-col items-center justify-between">
      <div className="z-10 items-center justify-between font-mono text-sm lg:flex">
        <div className="min-h-screen w-screen flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 grid-flow-row gap-10 w-full p-10">
            <div className="w-full">
              <h1 className="text-xl font-semibold mb-4">
                Select a Golf Course
              </h1>
              <Suspense
                fallback={
                  <SelectSkeleton
                    label={"Select Players"}
                    option={"Select a player"}
                  />
                }
              >
                <CourseListServer />
              </Suspense>
            </div>
            <div>
              <AddCourseForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
