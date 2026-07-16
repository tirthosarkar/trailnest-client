// Temporary test inside a page component
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function Page() {
  await delay(5000); // Forces Next.js to show loading.tsx for 5 seconds

  return <div>Page content loaded!</div>;
}
