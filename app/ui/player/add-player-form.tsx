"use client";
import { useFormState } from "react-dom";
import { createPlayer } from "../../lib/actions";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
export default function AddPlayerForm({ params }: { params: { id: string } }) {
  const createPlayerWithCourseId = createPlayer.bind(null, params.id);
  const [returnObj, dispatch] = useFormState(
    createPlayerWithCourseId,
    undefined,
  );
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (returnObj?.success) {
      toast.success(`Player ${returnObj.player.name} added!`);
      formRef.current?.reset();
    }
  }, [returnObj]);
  return (
    <>
      <h2 className="text-3xl font-semibold text-center mb-3">
        Add a New Player
      </h2>
      <form ref={formRef} action={dispatch}>
        <div
          id="customer-error"
          className="grid w-full text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {returnObj?.error && (
            <p
              className="mt-2 text-sm bg-white p-2 w-1/2 text-center rounded-lg text-red-500"
              key={returnObj.error}
            >
              {returnObj.error}
            </p>
          )}
        </div>
        <label htmlFor="playerName" className="block text-lg">
          Player Name
        </label>
        <input
          type="text"
          name="playerName"
          id="playerName"
          className="mt-1 block w-full px-3 py-2 border text-gray-500 text-2xl rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter player name"
          required
        />

        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Player
        </button>
      </form>
    </>
  );
}
