"use client";

export default function Navbar() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full">
      {/* Glassmorphic nav bar */}
      <div className="relative">
        {/* Border gradient */}
        <div className="absolute inset-0 h-px bottom-0"></div>

        <div className="">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-3 group"
              >
                <img
                  src="/icons/EPOCH4.svg"
                  alt="Epoch 4.0"
                  className="h-11 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              </button>

              {/* Navigation Links */}
              <ul className="hidden md:flex items-center gap-8">
                <li>
                  <button
                    onClick={scrollToTop}
                    className="  text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 p-1"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="  text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 p-1"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("Register")}
                    className="  px-4 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] text-sm font-medium text-white border border-white/10 hover:border-white/20 transition-all duration-200 p-1"
                  >
                    Register
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
