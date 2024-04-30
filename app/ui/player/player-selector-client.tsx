"use client";

import { Player } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Select, { ActionMeta } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

export default function PlayerSelector({ players }: { players: Player[] }) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const [options, setOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    if (players.length > 0) {
      setOptions(
        players.map((player) => ({
          value: player.id.toString(),
          label: player.name,
        })),
      );
    }
  }, [players]);

  const handleChange = (selected: any, actionMeta: ActionMeta<OptionType>) => {
    if (selected !== null) {
      const selectedValues = (selected as OptionType[]).map(
        (option) => option.value,
      );
      setSelectedOptions(selectedValues); // Update state
    } else {
      setSelectedOptions([]); // Clear state if no options are selected
    }
  };

  return (
    <div className="relative">
      <Select
        isMulti
        options={options}
        className="basic-multi-select text-gray-600 text-center text-2xl"
        classNamePrefix="select"
        onChange={handleChange}
      />
      <button
        disabled={!Boolean(selectedOptions.length)}
        onClick={() => console.log(selectedOptions)}
        className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Start!
      </button>
    </div>
  );
}
