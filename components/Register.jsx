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
          GitHub Profile Link
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
      <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-10 font-space">
        Registration Form
      </h1>

      <div
        className={`w-full p-4 md:p-10 bg-[#161b22] rounded-xl border border-[#30363d] shadow-xl overflow-hidden relative ${
          isSubmitted || isLoading ? "" : "min-h-[600px] md:min-h-[800px]"
        }`}
      >
        {!isSubmitted && !isLoading && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-2">
              <h2 className="text-xl md:text-3xl font-bold text-white">
                {step === totalSteps - 1
                  ? "Review Details"
                  : step === 0
                  ? "Team Details & Leader"
                  : `Team Member ${step}`}
              </h2>
              <div className="text-[#8b949e] font-medium text-sm md:text-base">
                Step {step + 1} of {totalSteps}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#30363d] rounded-full mb-8">
              <div
                className="h-full bg-[#1f6feb] rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${((step + 1) / totalSteps) * 100}%`,
                }}
              ></div>
            </div>
          </>
        )}

        <form className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {isLoading ? (
              // LOADING STATE
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-6"
              >
                <div className="relative w-20 h-20">
                  <svg
                    className="animate-spin h-full w-full text-[#1f6feb]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Registering Team...
                </h2>
                <p className="text-[#8b949e] text-lg max-w-md">
                  Please wait while we commit your code to the mainframe.
                </p>
              </motion.div>
            ) : isSubmitted ? (
              // SUCCESS STATE
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
                className="flex flex-col items-center justify-center py-20 text-center space-y-6"
              >
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Registration Successful!
                </h2>
                <p className="text-[#8b949e] text-lg max-w-md">
                  Your registration request has been sent successfully. <br />{" "}
                  Check your email for further confirmation.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 border border-[#30363d]"
                >
                  Submit Another Response
                </button>
              </motion.div>
            ) : (
              // FORM STEPS
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
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#c9d1d9]">
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
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-[#c9d1d9]">
                          Team Size *
                        </label>
                        <div className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-4 py-3 text-[#8b949e] cursor-not-allowed text-sm flex items-center">
                          4 Members (Fixed)
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-[#c9d1d9]">
                          Problem Statement
                        </label>
                        <div className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-4 py-3 text-[#8b949e] cursor-not-allowed text-sm flex items-center">
                          Problem statements will be revealed during the
                          hackathon!
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[#30363d] my-8 pt-6">
                      <h3 className="text-xl font-semibold text-white mb-6">
                        Team Leader Details
                      </h3>
                      {renderCommonFields(formData.leader, handleLeaderChange)}
                    </div>
                  </>
                )}

                {step > 0 && step < totalSteps - 1 && (
                  <>
                    <h3 className="text-xl font-semibold text-white mb-6">
                      Member {step} Details
                    </h3>
                    {renderCommonFields(
                      formData.members[step - 1] || {},
                      (e) => handleMemberChange(step - 1, e)
                    )}
                  </>
                )}

                {step === totalSteps - 1 && (
                  <div className="space-y-6">
                    <div className="bg-[#0d1117] p-6 rounded-lg border border-[#30363d] space-y-4">
                      <h4 className="text-xl font-semibold text-[#1f6feb] border-b border-[#30363d] pb-2">
                        Team Info
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="block text-[#8b949e]">
                            Team Name
                          </span>
                          <span className="text-white font-medium">
                            {formData.teamName}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[#8b949e]">
                            Team Size
                          </span>
                          <span className="text-white font-medium">
                            {formData.teamSize}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0d1117] p-6 rounded-lg border border-[#30363d] space-y-4">
                      <h4 className="text-xl font-semibold text-[#1f6feb] border-b border-[#30363d] pb-2">
                        Team Leader
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {Object.entries(formData.leader).map(([key, value]) => (
                          <div key={key}>
                            <span className="block text-[#8b949e] capitalize">
                              {key}
                            </span>
                            <span className="text-white font-medium">
                              {value || "-"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {formData.members.map((member, index) => (
                      <div
                        key={index}
                        className="bg-[#0d1117] p-6 rounded-lg border border-[#30363d] space-y-4"
                      >
                        <h4 className="text-xl font-semibold text-[#1f6feb] border-b border-[#30363d] pb-2">
                          Member {index + 2}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {Object.entries(member).map(([key, value]) => (
                            <div key={key}>
                              <span className="block text-[#8b949e] capitalize">
                                {key}
                              </span>
                              <span className="text-white font-medium">
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
                      disabled={isLoading}
                      className="flex-1 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] font-bold py-3 rounded-lg text-lg transition-colors duration-200 border border-[#30363d] cursor-target cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Back
                    </button>
                  )}

                  {step < totalSteps - 1 ? (
                    <button
                      onClick={nextStep}
                      className="flex-1 bg-[#1f6feb] hover:bg-[#238636] text-white font-bold py-3 rounded-lg text-lg transition-colors duration-200 shadow-md cursor-target cursor-pointer"
                    >
                      {step === totalSteps - 2
                        ? "Review Details"
                        : "Next: Add Member"}
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex-1 bg-[#238636] hover:bg-[#2ea043] text-white font-bold py-3 rounded-lg text-lg transition-colors duration-200 shadow-md cursor-pointer cursor-target disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? "Committing..." : "Commit To Challenge"}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Error Popup */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => !isLoading && setError(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl shadow-2xl max-w-md w-full text-center space-y-6"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Please Check Your Inputs
                </h3>
                <p className="text-[#8b949e]">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="w-full bg-[#21262d] hover:bg-[#30363d] text-white font-bold py-3 rounded-lg transition-colors border border-[#30363d]"
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
