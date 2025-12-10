import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="bg-[#454343] text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Content area spacing below navbar */}
      <div className="pt-28 px-10">
        <h1 className="text-2xl font-semibold">Test Area</h1>
        <p className="text-gray-300 mt-2">Background correctly applied.</p>
      </div>
    </main>
  );
}
