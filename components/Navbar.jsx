"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0f1214]">
      <div className="w-full px-8 py-4 flex items-center justify-between">
        {/* LEFT: LOGO */}
        <div className="flex flex-col items-center select-none space-y-">
          <span className="text-[#1F6FEB] font-space font-bold text-[24px] tracking-tight">
            EPOCH 4.0
          </span>

          <span className="text-[#C9D1D9] text-[14px] font-inter font-medium">
            GitHub Community GITAM
          </span>
        </div>

        {/* RIGHT: NAV LINKS */}
        <ul className="flex items-center gap-10">
          <Link href="/">
            <li className="text-[#E6EDF3] text-[15px] font-inter font-medium hover:text-white cursor-pointer">
              Home
            </li>
          </Link>
          <li className="text-[#E6EDF3] text-[15px] font-inter font-medium hover:text-white cursor-pointer">
            Registration
          </li>
          <Link href="/probstmts">
            <li className="text-[#E6EDF3] text-[15px] font-inter font-medium hover:text-white cursor-pointer">
              Problem Statements
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
