/**
 * Allow only Admin users
 */
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied: Admins only"
    });
  }
};

/**
 * Allow only Client users
 */
export const isClient = (req, res, next) => {
  if (req.user && req.user.role === "client") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied: Clients only"
    });
  }
};

/**
 * Allow only Provider users
 */
export const isProvider = (req, res, next) => {
  if (req.user && req.user.role === "provider") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied: Providers only"
    });
  }
};



