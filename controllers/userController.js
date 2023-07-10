import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "config";
import { validationResult } from "express-validator";

// import generateId from "../helpers/generateId.js";
// import generateJWT from "../helpers/generateJWT.js";

const userRegistration = async (req, res) => {
  const { name, email, password } = req.body;

  // Validation of user inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exist" }] });
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    // const jwtResult = JWTGenerator(user);
    const payload = {
      user: { id: user.id },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: "30d",
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    return res.status(400).send("Server error");
    console.log("error", error);
  }
};

const userAuthentication = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

const userLogIn = async (req, res) => {
  const { email, password } = req.body;

  // Validation of user inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const payload = {
      user: { id: user.id },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: "30d",
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log("error", error);
    return res.status(400).send("Server error");
  }
};

export { userRegistration, userAuthentication, userLogIn };
