import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import ComSpons from "../components/ComSpons";
import ProbStmts from "../components/ProbStmts";
import Register from "../components/Register";
import Footer from "@/components/Footer";
import DarkVeil from "@/components/background.jsx";

export default function Home() {
  return (
    <main className="text-white min-h-screen relative">
      <Navbar />
      
      <Hero />

      {/* Content Container with consistent spacing */}
      <div className="relative">
        {/* Gradient separators for visual hierarchy */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-32 py-24">
            <About />
            <ComSpons />
            <Register />
            {/* <ProbStmts /> */}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
