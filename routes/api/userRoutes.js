import express from "express";
import { userRegistration } from "../../controllers/userController.js";
import { check, validationResult } from "express-validator";

const router = express.Router();

// @route POST api/users
// @desc Register User
// @access Public

// router.post("/", (req, res) => {
//   console.log(req.body);
//   res.send("User route");
// });
router.post(
  "/",
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

export default router;
