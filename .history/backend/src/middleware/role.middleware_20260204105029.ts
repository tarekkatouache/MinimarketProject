// check if the user is an ADMIN
export const isAdmin = (Request, Response, next) => {
  if (req.userRole === "ADMIN") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

// check if the user is an ADMIN or MANAGER
export const isAdminOrManager = (req, res, next) => {
  if (req.userRole === "ADMIN" || req.userRole === "MANAGER") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied. Admins or Managers only." });
  }
};
