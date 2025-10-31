// routes/users.js
const express = require("express");
const { apiSuccess, apiError } = require("../utils/apiresult");
const { createToken } = require("../utils/jwtauth");

const router = express.Router();

// Hardcoded credentials
const HARDCODED_EMAIL = "qwe@gmail.com";
const HARDCODED_PASSWORD = "qwe";

// POST /users/signin
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send(apiError("Email and password are required"));
  }

  // Check against hardcoded values
  if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
    // Create a fake user object for the token payload
    const user = { id: 1, email: HARDCODED_EMAIL, role: "ADMIN" };
    const token = createToken(user);
    return res.send(apiSuccess({ token }));
  } else {
    return res.send(apiError("Invalid credentials"));
  }
});

module.exports = router;
