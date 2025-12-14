"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    // Check Team Name
    if (!formData.teamName.trim()) return "Team Name is required.";

    // Validate Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validate Phone Regex (simple 10 digit)
    const phoneRegex = /^\d{10}$/;

    // Check Leader
    if (!formData.leader.name.trim()) return "Leader Name is required.";
    if (!emailRegex.test(formData.leader.email))
      return "Leader Email is invalid.";
    if (!phoneRegex.test(formData.leader.phone))
      return "Leader Phone must be 10 digits.";
    if (!formData.leader.college.trim()) return "Leader College is required.";
    if (!formData.leader.year.trim()) return "Leader Year is required.";

    // Check Members
    for (let i = 0; i < formData.members.length; i++) {
      const m = formData.members[i];
      if (!m.name.trim()) return `Member ${i + 2} Name is required.`;
      if (!emailRegex.test(m.email)) return `Member ${i + 2} Email is invalid.`;
      if (!phoneRegex.test(m.phone))
        return `Member ${i + 2} Phone must be 10 digits.`;
      if (!m.college.trim()) return `Member ${i + 2} College is required.`;
      if (!m.year.trim()) return `Member ${i + 2} Year is required.`;
    }

    return null; // No errors
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setDirection(1);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setStep(0);
    setDirection(0);
    setIsSubmitted(false);
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
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          Name *
        </label>
        <input
          required
          name="name"
          value={data.name}
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          Email *
        </label>
        <input
          required
          name="email"
          value={data.email}
          onChange={handleChange}
          type="email"
          placeholder="Gitam Mail"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          Phone Number *
        </label>
        <input
          required
          name="phone"
          value={data.phone}
          onChange={handleChange}
          type="tel"
          placeholder="+91 XXXXXXXXXX"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">
            College Department & Branch *
          </label>
          <input
            required
            name="college"
            value={data.college}
            onChange={handleChange}
            type="text"
            placeholder="e.g. CSE"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">
            Year *
          </label>
          <input
            required
            name="year"
            value={data.year}
            onChange={handleChange}
            type="text"
            placeholder="e.g. 3rd"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          GitHub Profile Link
        </label>
        <input
          name="github"
          value={data.github}
          onChange={handleChange}
          type="url"
          placeholder="https://github.com/username"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
        />
      </div>
    </div>
  );

  const totalSteps = formData.teamSize + 1;

  return (
    <section id="Register" className="w-full max-w-4xl mx-auto scroll-mt-32">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white/70">Join the Challenge</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
            Team Registration
          </span>
        </h2>
        
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Assemble your dream team and register for GIT-A-THON 2025
        </p>
      </div>
      
      {/* Form Container */}
      <div className="group relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl opacity-50"></div>
        
        <div
          className={`relative w-full p-6 md:p-10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden ${
            isSubmitted ? "" : "min-h-[600px] md:min-h-[800px]"
          }`}
        >
        {!isSubmitted && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                {step === totalSteps - 1
                  ? "Review Details"
                  : step === 0
                  ? "Team Details & Leader"
                  : `Team Member ${step}`}
              </h3>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <span className="text-sm font-medium text-white/70">
                  Step {step + 1} of {totalSteps}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/5 rounded-full mb-10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </>
        )}

        <form className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-4xl font-bold text-white">
                    Registration Successful!
                  </h2>
                  <p className="text-white/60 text-lg max-w-md">
                    Your registration request has been sent successfully.
                    <br />
                    Check your email for further confirmation.
                  </p>
                </div>
                
                <button
                  onClick={handleReset}
                  className="mt-6 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
                >
                  Submit Another Response
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="space-y-8 w-full"
              >
                {step === 0 && (
                  <>
                    {/* Team Config */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/80">
                        Team Name *
                      </label>
                      <input
                        required
                        value={formData.teamName}
                        onChange={(e) =>
                          setFormData({ ...formData, teamName: e.target.value })
                        }
                        type="text"
                        placeholder="Enter Your Team Name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-white/80">
                          Team Size *
                        </label>
                        <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/60 cursor-not-allowed text-sm flex items-center">
                          4 Members (Fixed)
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-white/80">
                          Problem Statement
                        </label>
                        <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/60 cursor-not-allowed text-sm flex items-center">
                          Revealed during hackathon!
                        </div>
                      </div>
                    </div>

                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-4 bg-gradient-to-br from-white/[0.07] to-white/[0.02] text-white/70 text-sm font-medium">
                          Team Leader Details
                        </span>
                      </div>
                    </div>

                    {renderCommonFields(formData.leader, handleLeaderChange)}
                  </>
                )}

                {step > 0 && step < totalSteps - 1 && (
                  <div className="space-y-6">
                    {renderCommonFields(formData.members[step - 1] || {}, (e) =>
                      handleMemberChange(step - 1, e)
                    )}
                  </div>
                )}

                {step === totalSteps - 1 && (
                  <div className="space-y-6">
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent border-b border-white/10 pb-3">
                        Team Info
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="block text-white/50 text-xs mb-1">
                            Team Name
                          </span>
                          <span className="text-white font-medium">
                            {formData.teamName}
                          </span>
                        </div>
                        <div>
                          <span className="block text-white/50 text-xs mb-1">
                            Team Size
                          </span>
                          <span className="text-white font-medium">
                            {formData.teamSize}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent border-b border-white/10 pb-3">
                        Team Leader
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {Object.entries(formData.leader).map(([key, value]) => (
                          <div key={key}>
                            <span className="block text-white/50 text-xs mb-1 capitalize">
                              {key}
                            </span>
                            <span className="text-white font-medium break-all">
                              {value || "-"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {formData.members.map((member, index) => (
                      <div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-4"
                      >
                        <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent border-b border-white/10 pb-3">
                          Member {index + 2}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {Object.entries(member).map(([key, value]) => (
                            <div key={key}>
                              <span className="block text-white/50 text-xs mb-1 capitalize">
                                {key}
                              </span>
                              <span className="text-white font-medium break-all">
                                {value || "-"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col md:flex-row gap-4 pt-8">
                  {step > 0 && (
                    <button
                      onClick={prevStep}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-target cursor-pointer"
                    >
                      Back
                    </button>
                  )}

                  {step < totalSteps - 1 ? (
                    <button
                      onClick={nextStep}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 cursor-target cursor-pointer"
                    >
                      {step === totalSteps - 2
                        ? "Review Details"
                        : "Next: Add Member"}
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 cursor-pointer cursor-target"
                    >
                      Commit To Challenge
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        </div>
      </div>

      {/* Error Popup */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setError(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-white/[0.1] to-white/[0.05] backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  Please Check Your Inputs
                </h3>
                <p className="text-white/70 text-base">{error}</p>
              </div>
              
              <button
                onClick={() => setError(null)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 hover:scale-105"
              >
                Okay
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
