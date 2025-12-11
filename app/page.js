import Navbar from "../components/Navbar";
import About from "../components/About";
import ProbStmts from "../components/ProbStmts";

export default function Home() {
  return (
    <main className="bg-[#0f1214] text-white min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="pt-28">
        <About />
        <ProbStmts />
      </div>
    </main>
  );
}
