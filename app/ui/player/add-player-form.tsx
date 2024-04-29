"use client";
import { useFormState } from "react-dom";
import { createPlayer } from "../../lib/actions";
export default function AddPlayerForm() {
  const [error, dispatch] = useFormState(createPlayer, undefined);
  return (
    <>
      <h2 className="text-lg font-semibold mb-3">Add a New Player</h2>
      <form action={dispatch}>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {error && (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          )}
        </div>
        <label
          htmlFor="playerName"
          className="block text-sm font-medium text-gray-700"
        >
          Player Name
        </label>
        <input
          type="text"
          name="playerName"
          id="playerName"
          className="mt-1 block w-full px-3 py-2 border text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter player name"
          required
        />

        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Player
        </button>
      </form>
    </>
  );
}
