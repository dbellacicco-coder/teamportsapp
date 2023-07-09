import User from "../models/User.js";
import bcrypt from "bcryptjs";
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

  console.log("email", email);

  // user validation!
  // const emailExist = await User.find({ email });

  // if (emailExist.length > 0) {
  //   const userEmail = emailExist[0].email;
  //   const error = new Error(`User ${userEmail} already exist on Data Base`);
  //   return res.status(400).json({ msg: error.message });
  // }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exist" }] });
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send("User registered");
    console.log("user", user);
    // const user = new User(req.body);
    // user.token = generateId();
    // const userSaved = await user.save();
    // res.json(userSaved);
  } catch (error) {
    return res.status(400).send("Server error");
    console.log("error", error);
  }
};

export { userRegistration };
