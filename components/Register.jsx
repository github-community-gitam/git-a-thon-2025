"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/team/register`;

export default function Register() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    teamSize: 1,
    problemStatement: "",
    leader: {
      name: "",
      email: "",
      phone: "",
      college: "",
      year: "",
      github: "",
    },
    members: [],
  });

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const handleTeamSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      teamSize: size,
      members: Array(size - 1).fill({
        name: "",
        email: "",
        phone: "",
        college: "",
        year: "",
        github: "",
      }),
    }));
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
    const updated = [...formData.members];
    updated[index] = { ...updated[index], [name]: value };
    setFormData((prev) => ({ ...prev, members: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      setDirection(1);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Request failed:", err);
      alert("Failed to fetch. Please try again.");
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
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

  const renderCommonFields = (data, handleChange) => (
    <div className="space-y-6">
      <input name="name" value={data.name} onChange={handleChange} placeholder="Name" className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white" />
      <input name="email" value={data.email} onChange={handleChange} placeholder="Email" className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white" />
      <input name="phone" value={data.phone} onChange={handleChange} placeholder="Phone" className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white" />
      <input name="college" value={data.college} onChange={handleChange} placeholder="College" className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white" />
      <input name="year" value={data.year} onChange={handleChange} placeholder="Year" className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white" />
      <input name="github" value={data.github} onChange={handleChange} placeholder="GitHub" className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white" />
    </div>
  );

  const totalSteps = formData.teamSize + 1;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8">
        <form onSubmit={handleSubmit}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {isSubmitted ? (
              <motion.div className="text-center text-white py-20">
                <h2 className="text-2xl font-bold">Registration Successful!</h2>
              </motion.div>
            ) : (
              <motion.div className="space-y-8">
                {step === 0 && (
                  <>
                    <input
                      value={formData.teamName}
                      onChange={(e) =>
                        setFormData({ ...formData, teamName: e.target.value })
                      }
                      placeholder="Team Name"
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white"
                    />

                    <select
                      value={formData.teamSize}
                      onChange={handleTeamSizeChange}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white"
                    >
                      <option value="1">Solo</option>
                      <option value="2">2 Members</option>
                      <option value="3">3 Members</option>
                      <option value="4">4 Members</option>
                    </select>

                    {renderCommonFields(formData.leader, handleLeaderChange)}
                  </>
                )}

                {step > 0 && step < totalSteps - 1 &&
                  renderCommonFields(
                    formData.members[step - 1],
                    (e) => handleMemberChange(step - 1, e)
                  )}

                <div className="flex gap-4">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-gray-700 text-white py-3 rounded"
                    >
                      Back
                    </button>
                  )}

                  {step < totalSteps - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-blue-600 text-white py-3 rounded"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-3 rounded"
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
  );
}
