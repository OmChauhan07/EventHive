
// to export the authorize function
module.exports.authorize = (...roles) => {

  // return middleware
  return (req, res, next) => {

    // to check users role
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Access denied: insufficient permissions' });
    }

    // if the role is allowed
    next();
  };
};
