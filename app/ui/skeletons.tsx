import React from "react";

const shimmerStyle = {
  backgroundColor: "#bfb8b8",
  overflow: "hidden",
  padding: "10px",
  borderBottom: "1px solid #ccc",
};

const shimmerText = {
  height: "1em",
  backgroundColor: "#5e5d5c",
  width: "70%",
  marginTop: "0.5em",
};

export function ScorecardListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export function SelectSkeleton({
  label,
  option,
}: {
  label: string;
  option: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="course" className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <select
        defaultValue=""
        className="peer block w-full bg-[#bfb8b8] rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 text-gray-500 placeholder:text-gray-500"
      >
        <option value="" disabled>
          {option}
        </option>
      </select>
    </div>
  );
}
