export default function HackathonAboutSection() {
  return (
    <section className="bg-[#0f1214] text-gray-200 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top buttons */}
        <div className="flex justify-center gap-6 mb-10">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-6 py-3 shadow-md">
            Register Your Team
          </button>
          <button className="border border-green-600 text-green-300 hover:text-white hover:bg-green-700/10 rounded-lg px-6 py-3 font-medium">
            View Problem Statements
          </button>
        </div>

        {/* Heading + intro */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            About the Hackathon
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            EPOCH 4.0 Hackathon challenges teams to analyze real problem
            statements and build working application prototypes in just 24
            hours. The focus is on creativity, usability, functionality, and a
            strong user experience.
          </p>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left card */}
          <div className="bg-[#0d1112] border border-[#1f2628] rounded-xl p-6 shadow-inner">
            <div className="flex items-center mb-4">
              <img
                src="/icons/Lightbulb.svg"
                alt="Event highlights icon"
                className="w-6 h-6 mr-3 shrink-0"
              />
              <h3 className="text-lg font-medium text-white">
                Event Highlights
              </h3>
            </div>

            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <img
                  src="/icons/$.svg"
                  alt="Cash prize icon"
                  className="w-5 h-5 mt-1 shrink-0"
                />
                <div className="text-sm">
                  Cash prizes:{" "}
                  <span className="text-white font-semibold">
                    ₹5,000 • ₹3,000 • ₹1,000
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <img
                  src="/icons/Group.svg"
                  alt="Free registration icon"
                  className="w-5 h-5 mt-1 shrink-0"
                />
                <div className="text-sm">Free Registration</div>
              </li>

              <li className="flex items-start gap-3">
                <img
                  src="/icons/Gifts.svg"
                  alt="Goodies icon"
                  className="w-5 h-5 mt-1 shrink-0"
                />
                <div className="text-sm">Goodies and exciting prizes</div>
              </li>

              <li className="flex items-start gap-3">
                <img
                  src="/icons/Task alt.svg"
                  alt="Certificate icon"
                  className="w-5 h-5 mt-1 shrink-0"
                />
                <div className="text-sm">Certificates for participants</div>
              </li>
            </ul>
          </div>

          {/* Right card */}
          <div className="bg-[#0d1112] border border-[#1f2628] rounded-xl p-6 shadow-inner">
            <div className="flex items-center mb-4">
              <img
                src="/icons/Award star.svg"
                alt="Goodies icon"
                className="w-5 h-5 mt-1 shrink-0"
              />
              <h3 className="text-lg font-medium text-white">What to Expect</h3>
            </div>

            <ul className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <img
                  src="/icons/Task alt.svg" // or another check icon
                  alt=""
                  className="w-5 h-5 mt-1 shrink-0"
                />
                <div className="text-sm">Meals and refreshments throughout</div>
              </li>

              <li className="flex gap-3">
                <img
                  src="/icons/Task alt.svg"
                  alt=""
                  className="w-5 h-5 mt-1 shrink-0"
                />
                <div className="text-sm">
                  24 hours of non-stop coding and innovation
                </div>
              </li>

              <li className="flex gap-3">
                <img
                  src="/icons/Task alt.svg"
                  alt=""
                  className="w-5 h-5 mt-1 shrink-0"
                />
                <div className="text-sm">Mentorship from industry experts</div>
              </li>

              <li className="flex gap-3">
                <img
                  src="/icons/Task alt.svg"
                  alt=""
                  className="w-5 h-5 mt-1 shrink-0"
                />
                <div className="text-sm">
                  Networking with like-minded developers
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
