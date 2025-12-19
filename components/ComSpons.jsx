"use client";

import { useRouter } from "next/navigation";

export default function CommunitiesSponsors() {
  const communities = [
    { src: "/icons/GitHub.svg", alt: "GitHub", color: "from-gray-500/20 to-gray-600/20" },
    { src: "/icons/ACM.svg", alt: "ACM", color: "from-blue-500/20 to-blue-600/20" },
    { src: "/icons/IEEE.svg", alt: "IEEE", color: "from-indigo-500/20 to-indigo-600/20" },
    { src: "/icons/AWS.svg", alt: "AWS", color: "from-orange-500/20 to-orange-600/20" },
  ];

  const sponsors = [
    { src: "/icons/CSE.svg", alt: "GITAM CSE", color: "from-purple-500/20 to-purple-600/20", link: "https://www.gitam.edu/visakhapatnam/computer-science-and-engineering" },
    { src: "/icons/the_ananta_logo.svg", alt: "The Ananta", color: "from-pink-500/20 to-pink-600/20", link: "https://theananta.in" },
  ];

  const router = useRouter();

  return (
    <section className="relative">
      {/* Communities Section */}
      <div className="mb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white/70">Our Partners</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              Powered by Communities
            </span>
          </h2>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {communities.map((community, i) => (
            <div
              key={i}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${community.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl aspect-square flex items-center justify-center group-hover:scale-105">
                <img
                  src={community.src}
                  alt={community.alt}
                  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative h-px my-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Sponsors Section */}
      <div>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white/70">Supported By</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              Our Sponsors
            </span>
          </h2>
        </div>

        {/* Sponsors Grid */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {sponsors.map((sponsor, i) => (
            <div
              key={i}
              onClick={() => router.push(sponsor.link)}
              className="group relative cursor-pointer"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl rounded-2xl p-10 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl w-56 h-56 flex items-center justify-center group-hover:scale-105">
                <img
                  src={sponsor.src}
                  alt={sponsor.alt}
                  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
