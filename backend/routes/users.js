const User = require("../models/User");
const router = require("express").Router();

const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res, next) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).json("user already exist ");
  } else {
    try {
      // generate new Password

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      // save user and password

      const user = await newUser.save();
      res.status(200).json(user._id);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// Login
router.post("/login", async (req, res) => {
  // find user
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(400).json("wrong password or username");

    // validate password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validatePassword && res.status(400).json("wrong password");

    res.status(200).json({ _id: user._id, username: user.username });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
