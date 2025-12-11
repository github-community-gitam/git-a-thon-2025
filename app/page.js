import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import ProbStmts from "../components/ProbStmts";

export default function Home() {
  return (
    <main className="bg-[#0f1214] text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Other Sections with proper spacing */}
      <div className="px-4 md:px-20 space-y-28 mt-20">
        <About />
        <ProbStmts />
      </div>
    </main>
  );
}
