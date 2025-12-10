"use client";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#454343] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* LEFT - LOGO SECTION */}
        <div className="flex flex-col leading-tight">
          <span className="text-[#1F6FEB] font-bold text-[24px] font-space">
            EPOCH 4.0
          </span>
          <span className="text-[#C9D1D9] text-[14px] font-medium font-inter -mt-1">
            GitHub Community GITAM
          </span>
        </div>

        {/* RIGHT - NAV LINKS */}
        <ul className="flex items-center gap-8">
          <li className="text-[#E6EDF3] text-[16px] font-medium font-inter hover:text-white cursor-pointer transition">
            Home
          </li>
          <li className="text-[#E6EDF3] text-[16px] font-medium font-inter hover:text-white cursor-pointer transition">
            Registration
          </li>
          <li className="text-[#E6EDF3] text-[16px] font-medium font-inter hover:text-white cursor-pointer transition">
            Problem Statements
          </li>
        </ul>
      </div>
    </nav>
  );
}
