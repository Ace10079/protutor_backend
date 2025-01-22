require("dotenv").config(); // Load environment variables

const app = require("./app");
const db = require("./config/db");

const port = process.env.PORT || 3000; // Use environment variable for port

app.get("/", (req, res) => {
  res.send("Welcome to PROTUTOR");
});

app.listen(port, () => {
  console.log(`Server Listening on Port http://localhost:${port}`);
});
