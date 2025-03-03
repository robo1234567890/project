// const express = require("express");
// const fs = require("fs");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// const PORT = 5000;

// // ✅ Allow requests from your frontend domain
// app.use(cors({
//   origin: "https://symmetrical-meme-7v5gpp67jqq43xg5w-3000.app.github.dev", 
//   methods: "GET,POST",
//   allowedHeaders: "Content-Type"
// }));

// app.use(bodyParser.json());

// // Load users from JSON file
// const USERS_FILE = "user.json";

// const loadUsers = () => {
//   if (fs.existsSync(USERS_FILE)) {
//     return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
//   }
//   return [];
// };

// // Login Route
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   const users = loadUsers();

//   const user = users.find((u) => u.username === username && u.password === password);

//   if (user) {
//     res.json({ success: true, message: "Login successful", user });
//   } else {
//     res.status(401).json({ success: false, message: "Invalid username or password" });
//   }
// });

// // Signup Route
// app.post("/signup", (req, res) => {
//   const { username, email, phone, password } = req.body;
//   let users = loadUsers();

//   if (users.some((u) => u.email === email)) {
//     return res.status(400).json({ success: false, message: "User already exists. Please log in." });
//   }

//   const newUser = { username, email, phone, password };
//   users.push(newUser);
  
//   fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");

//   res.json({ success: true, message: "Signup successful. You can now log in." });
// });

// // Start Server
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });







const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// ✅ Fix: Allow requests from your frontend (without "/login" at the end)
app.use(cors({
  origin: "https://symmetrical-meme-7v5gpp67jqq43xg5w-3000.app.github.dev",
  methods: "GET,POST",
  allowedHeaders: "Content-Type"
}));

app.use(bodyParser.json());

// Load users from JSON file
const USERS_FILE = "user.json";

const loadUsers = () => {
  if (fs.existsSync(USERS_FILE)) {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  }
  return [];
};

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, message: "Login successful", user });
  } else {
    res.status(401).json({ success: false, message: "Invalid username or password" });
  }
});

// Signup Route
app.post("/signup", (req, res) => {
  const { username, email, phone, password } = req.body;
  let users = loadUsers();

  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ success: false, message: "User already exists. Please log in." });
  }

  const newUser = { username, email, phone, password };
  users.push(newUser);
  
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");

  res.json({ success: true, message: "Signup successful. You can now log in." });
});

// Start Server on 0.0.0.0 for Codespaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
