
const bcrypt = require("bcrypt");
const User = require("../Sequelize/db/Users");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ email, password: hash });
    res.json({ id: user.id, email: user.email });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: err.message });
  }
});

// логін
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json.status(401).json({ message: "неправильний пароль" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "secret",
      { expiresIn: "1h" },
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
