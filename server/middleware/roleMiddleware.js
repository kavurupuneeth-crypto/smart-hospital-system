const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
    }

    next();
  };
};

module.exports = roleMiddleware;
