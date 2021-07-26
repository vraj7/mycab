const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const { homepageAuthStatus } = require('../config/auth');

// Login Page
router.get('/login', homepageAuthStatus, (req, res) => res.render('login'));

// Register Page
router.get('/register', homepageAuthStatus, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password_confirm } = req.body;
  let errors = [];

  if (!name || !email || !password || !password_confirm) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password_confirm) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 4) {
    errors.push({ msg: 'Password must be at least 4 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.render('login', { success: "Sucessfully registered" });
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/users/login',
    failureFlash: false
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');

});

module.exports = router;
