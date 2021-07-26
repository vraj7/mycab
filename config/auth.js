module.exports = {
  checkauthStatus: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/users/login');
  },
  homepageAuthStatus: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/homepage');      
  }
};
