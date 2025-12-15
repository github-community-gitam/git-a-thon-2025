const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const { sendConfirmationEmail } = require("../email");

console.log("teamRoutes.js loaded");

router.get("/test", (req, res) => {
  res.send("Team routes are working!");
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

function validatePerson(p) {
  if (!p.name) throw "Name is required";
  if (!emailRegex.test(p.email)) throw "Invalid email";
  if (!phoneRegex.test(p.phone)) throw "Phone must be 10 digits";
  if (!p.college) throw "College is required";
  if (!p.year) throw "Year is required";
}

router.post("/register", async (req, res) => {
  console.log("POST /register hit");
  console.log("Request body:", req.body);

  try {
    const { teamName, teamSize, leader, members } = req.body;

    /* ---- BASIC CHECKS ---- */
    if (!teamName) throw "Team name required";
    if (teamSize !== 4) throw "Team size must be 4";
    if (!leader) throw "Leader data missing";
    if (!Array.isArray(members) || members.length !== 3)
      throw "Exactly 3 members required";

    validatePerson(leader);
    members.forEach(validatePerson);

    const emails = [
      leader.email,
      ...members.map((m) => m.email),
    ];
    if (new Set(emails).size !== emails.length)
      throw "Duplicate emails not allowed";

    const { data: teamData, error: teamError } = await supabase
      .from("teams_3")
      .insert([
        {
          team_name: teamName,
          team_size: teamSize,
        },
      ])
      .select()
      .single();

    if (teamError) throw teamError.message;

    const teamId = teamData.id;

    const { error: leaderError } = await supabase
      .from("participants")
      .insert([
        {
          team_id: teamId,
          role: "leader",
          ...leader,
        },
      ]);

    if (leaderError) throw leaderError.message;

    const membersWithTeam = members.map((m) => ({
      team_id: teamId,
      role: "member",
      ...m,
    }));

    const { error: membersError } = await supabase
      .from("participants")
      .insert(membersWithTeam);

    if (membersError) throw membersError.message;

    await sendConfirmationEmail(leader.email, teamName);

    return res.status(201).json({
      success: true,
      message: "Team registered successfully",
    });

  } catch (err) {
    console.error("Register error:", err);
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
