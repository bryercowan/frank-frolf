import React from "react";
import { fetchCourses } from "@/app/lib/data";
import CourseSelector from "@/app/ui/course/course-selector-client";
export default async function CourseListServer() {
  const courses = await fetchCourses();
  return (
    <>
      <div className="mb-4">
        <label htmlFor="course" className="mb-2 block text-sm font-medium">
          Choose Course
        </label>
        <CourseSelector courses={courses} />
      </div>
    </>
  );
}
