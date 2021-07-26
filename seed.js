
const faker = require("faker");
const connectDB = require("./config/db");
const Driver = require('./models/Driver');
require('dotenv').config()
// Connect to MongoDB
connectDB();
// make a bunch of drivers
let drivers = [];
for (let i = 0; i < 5000; i += 1) {
    var newDrivers = {
        name: faker.name.findName(),
        carmodel: "maruti swift",
        carnumber: faker.datatype.number(),
        location: { "type": "Point", "coordinates": [faker.address.longitude(), faker.address.latitude()] }
    };
    drivers.push(newDrivers);
}
Driver.insertMany(drivers).then(function(){
    console.log("Seeding completed")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});
