"use client";
import TargetCursor from "./hovereffect";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0f1214]">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <div className="w-full px-8 py-4 flex items-center justify-between">
        {/* LEFT LOGO */}
        <div className="flex flex-col items-center select-none cursor-target">
          <Link href={"/"}>
            <img
              src="/icons/EPOCH.svg"
              alt="Epoch 4.0 Logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* RIGHT NAV LINKS */}
        <ul className="flex items-center gap-10">
          <Link
            href="/"
            className="text-[#E6EDF3] text-[15px] font-inter hover:text-white font-semibold cursor-target p-1"
          >
            Home
          </Link>

          <li className="text-[#E6EDF3] text-[15px] font-inter hover:text-white cursor-pointer cursor-target font-semibold p-1">
            Registration
          </li>

          <Link
            href="/probstmts"
            className="text-[#E6EDF3] text-[15px] font-inter hover:text-white font-semibold cursor-target p-1"
          >
            Problem Statements
          </Link>
        </ul>
      </div>
    </nav>
  );
}
