import React, { useEffect, useState } from "react";
import { fetchCourses } from "@/app/lib/data";
import { Course } from "@prisma/client";
export default async function CourseSelector() {
  const courses = await fetchCourses();
  return (
    <>
      {courses?.length > 0 ? (
        <div className="mb-4">
          <label htmlFor="course" className="mb-2 block text-sm font-medium">
            Choose Course
          </label>
          <div className="relative">
            <select
              id="course"
              name="courseId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 text-gray-500 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="course-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {courses.map((course: Course) => (
                <option key={course.id} value={course.id}>
                  {course.name} - {course.numHoles} holes
                </option>
              ))}
            </select>
          </div>
          <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}></ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
