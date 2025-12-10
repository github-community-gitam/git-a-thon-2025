"use client";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0f1214] border-b border-[#1f2628]">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* LEFT: LOGO SECTION */}
        <div className="flex flex-col leading-tight select-none">
          <span className="text-[#1F6FEB] font-space font-bold text-[24px] tracking-tight">
            EPOCH 4.0
          </span>
          <span className="text-[#C9D1D9] text-[14px] font-inter font-medium -mt-1">
            GitHub Community GITAM
          </span>
        </div>

        {/* RIGHT: NAV LINKS */}
        <ul className="flex items-center gap-10">
          <li className="text-[#E6EDF3] text-[15px] font-inter font-medium hover:text-white transition cursor-pointer">
            Home
          </li>
          <li className="text-[#E6EDF3] text-[15px] font-inter font-medium hover:text-white transition cursor-pointer">
            Registration
          </li>
          <li className="text-[#E6EDF3] text-[15px] font-inter font-medium hover:text-white transition cursor-pointer">
            Problem Statements
          </li>
        </ul>
      </div>
    </nav>
  );
}
