"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <img src="/icons/EPOCH4.svg" alt="Epoch 4.0" className="h-11 w-auto group-hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            <li><Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors p-1">Home</Link></li>
            <li><Link href="/probstmts" className="text-sm font-medium text-white/70 hover:text-white transition-colors p-1">Problem Statements</Link></li>
            <li><Link href="/#about" className="text-sm font-medium text-white/70 hover:text-white transition-colors p-1">About</Link></li>
            <li><Link href="/leaderboard" className="text-sm font-medium text-white/70 hover:text-white transition-colors p-1">Leaderboard</Link></li>

            {session ? (
              <>
                <li><Link href="/dashboard" className="text-sm font-medium text-white/70 hover:text-white transition-colors p-1">Dashboard</Link></li>
                <li>
                  <button onClick={() => signOut()} className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-sm font-medium text-red-500 border border-red-500/20 transition-all">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium text-white border border-white/10 transition-all">
                  Login
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-white/10 px-6 py-4 space-y-4">
          <Link href="/" onClick={() => setIsOpen(false)} className="block w-full text-left text-sm font-medium text-white/70 hover:text-white py-2">Home</Link>
          <Link href="/probstmts" onClick={() => setIsOpen(false)} className="block w-full text-left text-sm font-medium text-white/70 hover:text-white py-2">Problem Statements</Link>
          <Link href="/#about" onClick={() => setIsOpen(false)} className="block w-full text-left text-sm font-medium text-white/70 hover:text-white py-2">About</Link>
          <Link href="/leaderboard" onClick={() => setIsOpen(false)} className="block w-full text-left text-sm font-medium text-white/70 hover:text-white py-2">Leaderboard</Link>

          {session ? (
            <>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block w-full text-left text-sm font-medium text-white/70 hover:text-white py-2">Dashboard</Link>
              <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 text-sm font-medium">Logout</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 text-sm font-medium">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
