const jwt = require('jsonwebtoken');

// Secret key used to sign and verify the token
const secretKey = 'your-secret-key'; // Replace this with a secure key, do not hardcode in production!

// Encrypt function to generate the token from a payload
const encrypt = (payload) => {
  // Sign the payload and create a token
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token will expire in 1 hour
  return token;
};

// Decrypt function to decode the token and get the payload
const decrypt = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { error: 'Token expired' };
    } else if (error.name === 'JsonWebTokenError') {
      return { error: 'Invalid token' };
    }
    return { error: 'Token verification failed' };
  }
};


module.exports = {
  encrypt,
  decrypt
};