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
      alert("Failed to reach server");
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
    <div className="space-y-4">
      <input
        required
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-3 bg-black text-white border"
      />
      <input
        required
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-3 bg-black text-white border"
      />
      <input
        required
        name="phone"
        value={data.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full p-3 bg-black text-white border"
      />
      <input
        required
        name="college"
        value={data.college}
        onChange={handleChange}
        placeholder="College"
        className="w-full p-3 bg-black text-white border"
      />
      <input
        required
        name="year"
        value={data.year}
        onChange={handleChange}
        placeholder="Year"
        className="w-full p-3 bg-black text-white border"
      />
      <input
        name="github"
        value={data.github}
        onChange={handleChange}
        placeholder="GitHub"
        className="w-full p-3 bg-black text-white border"
      />
    </div>
  );

  const totalSteps = formData.teamSize + 1;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-center text-white py-20"
            >
              <h2 className="text-3xl font-bold">Registration Successful!</h2>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
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
                    className="w-full p-3 bg-black text-white border"
                  />

                  <select
                    value={formData.teamSize}
                    onChange={handleTeamSizeChange}
                    className="w-full p-3 bg-black text-white border"
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
                    className="flex-1 bg-gray-600 text-white p-3"
                  >
                    Back
                  </button>
                )}

                {step < totalSteps - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-blue-600 text-white p-3"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white p-3"
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
  );
}
