
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Driver = require('../models/Driver');

const { checkauthStatus } = require('../config/auth');

router.get('/', checkauthStatus, (req, res) => res.render('homepage'));
//list all bookings by user
router.get('/list', checkauthStatus, (req, res) => {
  Booking.find({ 'userid': req.user._id }, (err, docs) => {
    if (err)
      res.render('homepage');
    else
      docs.length == 0 ? res.render('booking', { nodata: "No cabs booked" }) : res.render('allbookings', { data: docs });


  });
})

//book a cab
router.post('/bookcab', checkauthStatus, (req, res) => {
  console.log(req.body)
  const driverid = req.body.driverId;
  const userid = req.user._id;
  const curlong = req.body.curlong;
  const curlat = req.body.curlat;
  const destlong = req.body.destlong;
  const destlat = req.body.destlat;
  const drivername = req.body.drivername;
  const carmodel = req.body.carmodel;
  const carnumber = req.body.carnumber;

  const newBooking = new Booking({
    userid,
    driverid,
    drivername,
    carmodel,
    carnumber,
    bookingloc: [{ curlong, curlat, destlong, destlat }]
  });

  newBooking
    .save()
    .then(booking => {
      res.render('booking', { booked_msg: "cab sucessfully booked" });
    })
    .catch(err => console.log(err));
});

//find nearest cab 
router.post('/cab', checkauthStatus, (req, res) => {
  console.log(req);
  let errors = [];
  const { curlat, curlong, destlat, destlong } = req.body;

  if (!curlat || !curlong || !destlat || !destlong) {
    errors.push({ msg: 'Please enter all fields' });
    console.log("errors");
  }
  if (errors.length > 0) {
    res.render('driver', {
      errors
    });
  } else {
    Driver.find(
      {
        "location": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [curlong, curlat]
            },
            $maxDistance: 12000
          }
        }
      }, function (err, docs) {
        if (err) {
          console.log(err);
          res.render('homepage');
        }
        else {
          docs.length == 0 ? res.render('booking', { nodata: "No cabs nearby" }) : res.render('booking', { data: docs[0], loc: req.body });

        }
      })

  }
});
module.exports = router;