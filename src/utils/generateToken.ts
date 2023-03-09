import jwt from "jsonwebtoken";

/**
 * Generates a jwt token for a user id using the JWT_SECRET and JWT_EXPIRES_IN environment variables
 * @param {string} id the user id to generate a token for
 * @returns jwt token
 */
function generateToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export default generateToken;