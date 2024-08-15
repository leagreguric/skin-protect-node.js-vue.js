// src/middleware/admin.js
export const isAdmin = (req, res, next) => {
  console.log('Session data:', req.session);
  
  if (req.session && req.session.user && req.session.user.role === 'admin') {
      return next(); 
  } else {
      console.log(`Access denied. User role: ${req.session ? req.session.user?.role : 'No user information found'}`);
      
  }
};
