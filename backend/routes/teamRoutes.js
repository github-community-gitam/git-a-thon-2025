const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const { sendConfirmationEmail } = require("../email");

router.get("/test", (req, res) => {
  res.send("Team routes are working!");
});

router.post("/register", async (req, res) => {
  try {
    const { teamName, teamSize, leader, members } = req.body;

    // Insert team
    const { data: teamData, error: teamError } = await supabase
      .from("teams_3")
      .insert({
        team_name: teamName,
        team_size: teamSize,
      })
      .select()
      .single();

    if (teamError) throw teamError;

    const teamId = teamData.id;

    // Build participants
    const participants = [
      {
        team_id: teamId,
        name: leader.name,
        email: leader.email,
        phone: leader.phone,
        college: leader.college,
        year: leader.year,
        github: leader.github,
        role: "leader",
      },
      ...members.map((m) => ({
        team_id: teamId,
        name: m.name,
        email: m.email,
        phone: m.phone,
        college: m.college,
        year: m.year,
        github: m.github,
        role: "member",
      })),
    ];

    // Insert participants
    const { error: participantError } = await supabase
      .from("participants")
      .insert(participants);

    if (participantError) {
      if (participantError.code === "23505") {
        return res.status(400).json({
          message: "One or more participant emails are already registered",
        });
      }
      throw participantError;
    }

    // Send  email
    await sendConfirmationEmail(leader.email, req.body);

    return res.status(201).json({
      message: "Team registered successfully",
      teamId,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({
      message: err.message || "Server error",
    });
  }
});

module.exports = router;
