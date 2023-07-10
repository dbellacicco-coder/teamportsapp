import express from "express";
import {
  userRegistration,
  userAuthentication,
  userLogIn,
} from "../../controllers/userController.js";
import { check, validationResult } from "express-validator";
import { tokenVerification } from "../../middleware/auth.js";
import User from "../../models/User.js";

const router = express.Router();

// @route POST api/users
// @desc Register User
// @access Public

router.post(
  "/registration",
  [
    check("name", "Name is requireD").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter password with 6 or more characters"
    ).isLength({ min: 8 }),
  ],
  userRegistration
);

// @route POST api/users/auth
// @desc aUTHENTICATE USER AND GET TOKEN
// @access Public

router.post(
  "/auth",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  userLogIn
);

// @route GET api/users/auth
// @desc Register Token Authentication
// @access Public

router.get("/auth", tokenVerification, userAuthentication);

export default router;
