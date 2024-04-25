import CourseSelector from "@/app/ui/course-list.server";
import AddCourseForm from "@/app/ui/add-course-form";
import { Suspense } from "react";
import { CourseListFunction } from "@/app/ui/skeletons";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w flex-col items-center justify-between">
      <div className="z-10 items-center justify-between font-mono text-sm lg:flex">
        <div className="min-h-screen w-screen bg-gray-200 flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold mb-4">Select a Golf Course</h1>
          <Suspense fallback={<CourseListFunction />}>
            <CourseSelector />
          </Suspense>
          <AddCourseForm />
        </div>
      </div>
    </main>
  );
}
