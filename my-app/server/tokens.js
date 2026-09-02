const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Demo user (replace with a database in production)
const userCredentials = {
  username: "admin",
  password: "admin123",
  email: "admin@gmail.com",
};

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials
  if (
    username !== userCredentials.username ||
    password !== userCredentials.password
  ) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  // Generate access token
  const accessToken = jwt.sign(
    {
      username: userCredentials.username,
      email: userCredentials.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  // Generate refresh token
  const refreshToken = jwt.sign(
    {
      username: userCredentials.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Store refresh token in HttpOnly cookie
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    accessToken,
  });
});

// Refresh Access Token
app.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.jwt;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token not found",
    });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid or expired refresh token",
        });
      }

      // Generate a new access token
      const accessToken = jwt.sign(
        {
          username: decoded.username,
          email: userCredentials.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );

      return res.status(200).json({
        accessToken,
      });
    }
  );
});

// Home Route
app.get("/", (req, res) => {
  res.send("JWT Authentication Server Running");
});

// Start Server
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});