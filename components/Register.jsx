"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "https://git-a-thon-backend.onrender.com/api/team/register";

export default function Register() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New Loading State
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    teamName: "",
    teamSize: 4,
    problemStatement: "",
    leader: {
      name: "",
      email: "",
      phone: "",
      college: "",
      year: "",
      github: "",
    },
    members: Array(3).fill({
      name: "",
      email: "",
      phone: "",
      college: "",
      year: "",
      github: "",
    }),
  });

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const validateForm = () => {
    if (!formData.teamName.trim()) return "Team Name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/;
    const yearRegex = /^(1|2|3|4|1st|2nd|3rd|4th)$/i;

    // Leader
    if (!formData.leader.name.trim()) return "Leader Name is required.";
    if (!emailRegex.test(formData.leader.email))
      return "Leader Email is invalid.";
    if (!phoneRegex.test(formData.leader.phone))
      return "Leader Phone must be 10 digits.";
    if (!formData.leader.college.trim()) return "Leader College is required.";
    if (!yearRegex.test(formData.leader.year))
      return "Leader Year must be 1, 2, 3, 4 or 1st, 2nd, 3rd, 4th.";
    if (!githubRegex.test(formData.leader.github))
      return "Leader GitHub profile link is invalid.";

    // Members
    for (let i = 0; i < formData.members.length; i++) {
      const m = formData.members[i];

      if (!m.name.trim()) return `Member ${i + 2} Name is required.`;
      if (!emailRegex.test(m.email)) return `Member ${i + 2} Email is invalid.`;
      if (!phoneRegex.test(m.phone))
        return `Member ${i + 2} Phone must be 10 digits.`;
      if (!m.college.trim()) return `Member ${i + 2} College is required.`;
      if (!yearRegex.test(m.year))
        return `Member ${i + 2} Year must be 1, 2, 3, 4 or 1st, 2nd, 3rd, 4th.`;
      if (!githubRegex.test(m.github))
        return `Member ${i + 2} GitHub profile link is invalid.`;
    }

    return null;
  };

  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      leader: { ...prev.leader, [name]: value },
    }));
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...formData.members];
    updatedMembers[index] = { ...updatedMembers[index], [name]: value };
    setFormData((prev) => ({ ...prev, members: updatedMembers }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    // Validate before going to Review Step
    if (step === formData.teamSize - 1) {
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return;
      }
    }
    if (step < formData.teamSize) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const prevStep = (e) => {
    e.preventDefault();
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isLoading) return;

    setIsLoading(true); // Start Loading

    const payload = {
      teamName: formData.teamName,
      teamLeaderName: formData.leader.name,
      email: formData.leader.email,
      phoneNumber: formData.leader.phone,
      college: formData.leader.college,
      year: formData.leader.year,
      githubProfile: formData.leader.github,
      teamSize: formData.teamSize,
      problemPreference: formData.problemStatement || "Not selected",
      members: formData.members,
    };

    try {
      console.log("🚀 Sending payload:", payload);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("📥 Backend response:", data);

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setIsLoading(false); // Stop loading on error
        return;
      }

      setDirection(1);
      setIsSubmitted(true);
      setIsLoading(false); // Stop loading on success (view changes to success)
    } catch (err) {
      console.error("❌ Request failed:", err);
      setError("Failed to connect to server. Please try again.");
      setIsLoading(false); // Stop loading on error
    }
  };

  const handleReset = () => {
    setStep(0);
    setDirection(0);
    setIsSubmitted(false);
    setIsLoading(false);
    setFormData({
      teamName: "",
      teamSize: 4,
      problemStatement: "",
      leader: {
        name: "",
        email: "",
        phone: "",
        college: "",
        year: "",
        github: "",
      },
      members: Array(3).fill({
        name: "",
        email: "",
        phone: "",
        college: "",
        year: "",
        github: "",
      }),
    });
  };

  // Helper to render common fields
  const renderCommonFields = (data, handleChange, prefix = "") => (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#c9d1d9]">
          Name *
        </label>
        <input
          required
          name="name"
          value={data.name}
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-all"
        />
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#c9d1d9]">
          Email *
        </label>
        <input
          required
          name="email"
          value={data.email}
          onChange={handleChange}
          type="email"
          placeholder="Gitam Mail"
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-all"
        />
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#c9d1d9]">
          Phone Number *
        </label>
        <input
          required
          name="phone"
          value={data.phone}
          onChange={handleChange}
          type="tel"
          placeholder="+91 XXXXXXXXXX"
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-all"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#c9d1d9]">
            College Department & Branch *
          </label>
          <input
            required
            name="college"
            value={data.college}
            onChange={handleChange}
            type="text"
            placeholder="e.g. CSE"
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-all"
          />
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#c9d1d9]">
            Year *
          </label>
          <input
            required
            name="year"
            value={data.year}
            onChange={handleChange}
            type="text"
            placeholder="e.g. 3rd"
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-all"
          />
        </div>
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#c9d1d9]">
          GitHub Profile Link *
        </label>
        <input
          name="github"
          value={data.github}
          onChange={handleChange}
          type="url"
          placeholder="https://github.com/username"
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-all"
        />
      </div>
    </div>
  );

  const totalSteps = formData.teamSize + 1;

  return (
    <section id="Register" className="w-full max-w-3xl mx-auto scroll-mt-32">
      <div className="w-full p-10 bg-[#161b22] rounded-xl border border-[#30363d] shadow-xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          {/* BIG ICON */}
          <div className="w-24 h-24 bg-[#238636] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#238636]/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01"
              />
            </svg>
          </div>
          {/* TEXT */}
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Registrations Closed
          </h2>
          <p className="text-[#8b949e] text-lg max-w-md">
            Thank you for the overwhelming response! Team registrations are
            currently closed.
          </p>
          <p className="text-[#8b949e] text-base max-w-md">
            Please keep an eye on your email and our socials for further
            updates.
          </p>
          {/* BADGE
          <div className="pt-6">
            <span className="inline-block bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-6 py-3 rounded-lg text-sm font-medium">
              🚫 Registration Disabled
            </span>
          </div> */}
        </div>
      </div>
    </section>
  );
}
