// imports
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// checks req. before allowing access to protected routes
const protect = async (req, res, next) => {
  let token;

  // check for the auth header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {

    // verfy token
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // fetch user form db
      req.user = await User.findById(decoded.user.id).select('-password');

      next(); 
    } 
    
    // error handling
    catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

// export
module.exports = { protect };