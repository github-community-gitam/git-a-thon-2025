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
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("HANDLE SUBMIT FIRED");
    console.log("API_URL =", API_URL);

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

    console.log("Payload being sent:", payload);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Fetch response:", res);

      const data = await res.json();
      console.log("Response JSON:", data);

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("FETCH FAILED:", err);
      alert("Failed to reach backend");
    }
  };

  const renderCommonFields = (data, handleChange) => (
    <div className="space-y-6">
      <input
        required
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white"
      />
      <input
        required
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white"
      />
      <input
        required
        name="phone"
        value={data.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white"
      />
      <input
        required
        name="college"
        value={data.college}
        onChange={handleChange}
        placeholder="College"
        className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white"
      />
      <input
        required
        name="year"
        value={data.year}
        onChange={handleChange}
        placeholder="Year"
        className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white"
      />
      <input
        name="github"
        value={data.github}
        onChange={handleChange}
        placeholder="GitHub"
        className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white"
      />
    </div>
  );

  const totalSteps = formData.teamSize + 1;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Registration Form
      </h1>

      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8">
        <form onSubmit={handleSubmit}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-white text-center py-20"
              >
                <h2 className="text-2xl font-bold">
                  Registration Successful!
                </h2>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-8"
              >
                {step === 0 && (
                  <>
                    <input
                      required
                      value={formData.teamName}
                      onChange={(e) =>
                        setFormData({ ...formData, teamName: e.target.value })
                      }
                      placeholder="Team Name"
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-white"
                    />
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
