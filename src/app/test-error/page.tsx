"use client";

import { useState } from "react";

export default function TestPage() {
  const [shouldCrash, setShouldCrash] = useState(false);

  // This forces the error to happen during the RENDER phase,
  // which is exactly what error.tsx is built to catch.
  if (shouldCrash) {
    throw new Error("Simulated application render crash!");
  }

  return (
    <div className="p-20 text-center min-h-[50vh] flex flex-col items-center justify-center">
      <h1 className="mb-4 text-xl font-bold">Testing Error Boundary</h1>
      <button
        onClick={() => setShouldCrash(true)}
        className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-red-600 transition"
      >
        Click to Crash Page
      </button>
    </div>
  );
}
