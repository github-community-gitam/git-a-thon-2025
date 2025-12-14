"use client";

export default function CommunitiesSponsors() {
  const communities = [
    { src: "/icons/GitHub.svg", alt: "GitHub" },
    { src: "/icons/ACM.svg", alt: "ACM" },
    { src: "/icons/IEEE.svg", alt: "IEEE" },
    { src: "/icons/AWS.svg", alt: "AWS" },
  ];

  const sponsors = [
    { src: "/icons/CSE.svg", alt: "GITAM CSE" },
    { src: "/icons/the_ananta_logo.svg", alt: "The Ananta" },
  ];

  return (
    <section className="bg-[#0f1214] py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Powered by Communities */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-13">
          Powered by Communities
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 mb-24 place-items-center">
          {communities.map((icon, i) => (
            <div
              key={i}
              className="
                w-44 h-44
                rounded-xl
                border border-[#1f2628] border-2
                flex items-center justify-center
                transition-all duration-300
                hover:border-blue-500/60
                hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]
              "
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-40 h-40 object-contain bg-transparent"
              />
            </div>
          ))}
        </div>

        {/* Sponsors */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-12">
          Sponsors
        </h2>

        <div className="grid grid-cols-2 gap-40 place-items-center justify-center md:flex md:justify-center">
          {sponsors.map((icon, i) => (
            <div
              key={i}
              className="
                w-44 h-44
                rounded-xl
                border border-[#1f2628] border-2
                flex items-center justify-center
                transition-all duration-300
                hover:border-purple-500/60
                hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]
              "
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-40 h-40 object-contain bg-transparent"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
