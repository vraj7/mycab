
const express = require('express');
const router = express.Router();

const { checkauthStatus, homepageAuthStatus } = require('../config/auth');

// Welcome Page
router.get('/', homepageAuthStatus, (req, res) => res.render('login'));

// Home Page
router.get('/homepage', checkauthStatus, (req, res) =>
  res.render('homepage', {
    user: req.user
  })
);

module.exports = router;