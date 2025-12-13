const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const teamRoutes = require("./routes/teamRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/team", teamRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
