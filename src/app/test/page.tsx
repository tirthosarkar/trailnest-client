'use client'; // error.tsx catches errors from Client Components or interactive handlers

export default function TestPage() {
  return (
    <div className="p-8">
      <button
        onClick={() => {
          throw new Error('Simulated application crash test!');
        }}
        className="bg-red-500 text-white p-2 rounded"
      >
        Trigger Crash Screen
      </button>
    </div>
  );
}
