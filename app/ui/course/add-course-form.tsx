"use client";
import { useFormState } from "react-dom";
import { createCourse } from "../../lib/actions";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
export default function AddCourseForm() {
  const [resObj, dispatch] = useFormState(createCourse, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (resObj?.success) {
      toast.success(`Course ${resObj.course.name} added!`);
      formRef.current?.reset();
    }
  }, [resObj]);
  return (
    <>
      <h2 className="text-3xl font-semibold mb-3">Add a New Course</h2>
      <form action={dispatch}>
        <div
          id="customer-error"
          className="grid w-full text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {resObj?.error && (
            <p
              className="mt-2 text-sm bg-white p-2 w-1/2 text-center rounded-lg text-red-500"
              key={resObj.error}
            >
              {resObj.error}
            </p>
          )}
        </div>
        <label htmlFor="name" className="block text-lg font-medium">
          Course Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="mt-1 block w-full px-3 py-2 border text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-2xl"
          placeholder="Enter course name"
          required
        />
        <label htmlFor="numHoles" className="block text-sm font-medium mt-4">
          Number of Holes
        </label>
        <input
          type="number"
          name="numHoles"
          id="numHoles"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-2xl"
          placeholder="18"
          required
        />

        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Course
        </button>
      </form>
    </>
  );
}
