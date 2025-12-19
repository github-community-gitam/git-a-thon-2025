"use client";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/github-community-gitam",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.25-.13-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.24a11.5 11.5 0 0 1 6 0c2.3-1.56 3.3-1.24 3.3-1.24.66 1.65.25 2.87.12 3.17.77.85 1.24 1.93 1.24 3.25 0 4.63-2.8 5.66-5.48 5.96.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/githubcommunitygitam/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.17.06 1.8.25 2.22.42.55.21.94.47 1.35.88.41.41.67.8.88 1.35.17.42.36 1.05.42 2.22.07 1.2.07 1.6.07 4.8s0 3.6-.07 4.8c-.06 1.17-.25 1.8-.42 2.22-.21.55-.47.94-.88 1.35-.41.41-.8.67-1.35.88-.42.17-1.05.36-2.22.42-1.2.07-1.6.07-4.8.07s-3.6 0-4.8-.07c-1.17-.06-1.8-.25-2.22-.42a3.38 3.38 0 0 1-1.35-.88 3.38 3.38 0 0 1-.88-1.35c-.17-.42-.36-1.05-.42-2.22C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.8c.06-1.17.25-1.8.42-2.22.21-.55.47-.94.88-1.35.41-.41.8-.67 1.35-.88.42-.17 1.05-.36 2.22-.42C8.4 2.2 8.8 2.2 12 2.2zM12 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.9a1.45 1.45 0 1 1-2.9 0 1.45 1.45 0 0 1 2.9 0z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/githubcommunitygitam/posts/?feedView=all",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24h5V7H0v17zM8 7h4.8v2.3h.07c.67-1.27 2.3-2.6 4.73-2.6C22.6 6.7 24 9.4 24 13.1V24h-5v-9.6c0-2.3-.04-5.2-3.17-5.2-3.17 0-3.66 2.47-3.66 5.03V24H8V7z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative mt-32 border-t border-white/10">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left: Branding */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              GIT-A-THON 2025
            </h3>
            <p className="text-white/70 text-sm">
              GitHub Community GITAM
            </p>
            <p className="text-white/50 text-xs">
              Part of EPOCH 4.0 Tech Fest
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label={social.name}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-110">
                  <div className="text-white/70 group-hover:text-white transition-colors">
                    {social.icon}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-center text-white/50 text-sm">
            © 2025 GIT-A-THON · EPOCH 4.0 Hackathon. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <span className="text-white/30 text-xs text-center">
              Hackathon Experience built by <span className="text-blue-400 font-medium hover:text-blue-300 transition-colors cursor-default"><a href="https://theananta.in">the ananta</a></span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
