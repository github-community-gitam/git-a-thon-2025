import Navbar from "../components/Navbar";
import About from "../components/About";

export default function Home() {
  return (
    <main className="bg-[#0f1214] text-white min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="pt-28">
        {/* ABOUT SECTION */}
        <About />
      </div>
    </main>
  );
}
