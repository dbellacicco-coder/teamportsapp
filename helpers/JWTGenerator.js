import jwt from "jsonwebtoken";
import config from "config";

const JWTGenerator = (user) => {
  const payload = {
    user: { id: user.id },
  };
  return jwt.sign(
    payload,
    config.get("jwtSecret"),
    {
      expiresIn: "30d",
    },
    (error, token) => {
      if (error) throw error;
      resizeBy.json({ token });
    }
  );
};

export default JWTGenerator;
