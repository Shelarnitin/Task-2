const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(require("cors")());

let users = []; // Temporary in-memory storage

app.post("/submit", (req, res) => {
  const { name, email, password, age } = req.body;

  // Server-side validation
  if (!name || !email || !password || !age) {
    return res.json({ success: false, message: "All fields are required." });
  }

  if (!email.includes("@")) {
    return res.json({ success: false, message: "Invalid email address." });
  }

  if (password.length < 6) {
    return res.json({ success: false, message: "Password too short." });
  }

  if (isNaN(age) || age <= 0) {
    return res.json({ success: false, message: "Invalid age." });
  }

  // Store valid data temporarily
  users.push({ name, email, password, age });
  console.log("Current Users:", users);

  res.json({ success: true, message: "Form submitted successfully!" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
