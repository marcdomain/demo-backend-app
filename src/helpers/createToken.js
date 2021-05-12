require("dotenv").config()
const jwt = require("jsonwebtoken");

module.exports = async (payload, expTime) => {
  try {
    return jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: expTime }
    );
  } catch (error) {
    if (error.message.includes('secretOrPrivateKey'))
      throw new Error('Please set SECRET_KEY');
    throw new Error(error.message);
  }
};
