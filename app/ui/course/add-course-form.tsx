"use client";
import { useFormState } from "react-dom";
import { createCourse } from "../../lib/actions";
export default function AddCourseForm() {
  const [error, dispatch] = useFormState(createCourse, undefined);
  return (
    <>
      <h2 className="text-lg font-semibold mb-3">Add a New Course</h2>
      <form action={dispatch}>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {error && (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          )}
        </div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Course Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="mt-1 block w-full px-3 py-2 border text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter course name"
          required
        />
        <label
          htmlFor="numHoles"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Number of Holes
        </label>
        <input
          type="number"
          name="numHoles"
          id="numHoles"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
