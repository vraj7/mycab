
const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const { checkauthStatus } = require('../config/auth');

router.get('/', checkauthStatus, (req, res) => res.render('driver'));

//create Driver 
router.post('/create',checkauthStatus, (req, res) => {
  let isBooked = false
  const { name, carmodel, carnumber, carlong, carlat } = req.body;
  let errors = [];

  if (!name || !carmodel || !carnumber || !carlong || !carlat) {
    errors.push({ msg: 'Please enter all fields' });
    console.log("errors");
  }
  if (errors.length > 0) {
    res.render('driver', {
      errors
    });
  } else {
    const newDriver = new Driver({
      name,
      carmodel,
      carnumber,
      isBooked
    });
    newDriver.location = { "type": "Point", "coordinates": [carlong, carlat] };
    newDriver
      .save()
      .then(driver => {
        res.render('driver',{success_msg:"Driver sucessfully created"});
      })
      .catch(err => console.log(err));
  }
});

module.exports = router;