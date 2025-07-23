const jwt = require("jsonwebtoken");

const DUMMY_USER = {
  username: "Testuser",
  password: "TestUser@123",
};

exports.login = (req, res) => {
  console.log("Im in user controller,", req.body);

  const { username, password } = req.body;

  if (username !== DUMMY_USER.username || password !== DUMMY_USER.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};

exports.protectedRoute = (req, res) => {
  res.json({ message: "You accessed protected data!", user: req.user });
};

exports.logout = (req, res) => {
  res.json({ message: "Logout successful" });
};
