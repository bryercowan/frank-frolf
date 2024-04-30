"use client";

import { Course } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

export default function CourseSelector({ courses }: { courses: Course[] }) {
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseId(event.target.value);
  };
  return (
    <div className="relative">
      <select
        id="course"
        name="courseId"
        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-2xl outline-2 text-gray-500 placeholder:text-gray-500"
        value={selectedCourseId}
        onChange={handleCourseChange}
        aria-describedby="course-error"
      >
        <option value="" disabled>
          Select a course
        </option>
        {courses.map((course: Course) => (
          <option key={course.id} value={course.id}>
            {course.name} - {course.numHoles} holes
          </option>
        ))}
      </select>
      <Link href={`/courses/${selectedCourseId}`} passHref>
        <button
          disabled={!Boolean(selectedCourseId)}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Play Course!
        </button>
      </Link>
    </div>
  );
}
