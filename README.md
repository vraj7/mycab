# Nodejs Expressjs MongoDB Cab booking rest api implementation

## Getting started

This is basic cab booking app on node js ,express js,mongodb to show rest api implementation 

## Software Requirements

- Node.js **8+**
- MongoDB **3.6+** (Recommended **4+**)

## How to install

### Install npm dependencies after installing (Git or manual download)
Clone the repository.
cd mycab
npm install
```

## How to run
 seed testdata for drivers - node seed.js
type command : node app.js or npm start
http://localhost:5000/ to access 
register a user with any name 
login as user 
Press CTRL + C to stop the process.
```
**Note:** `MONGO_URI` will be your MongoDB connection string inside .env file.

Searches for cab near your coordinates within 12km and return nearest cab to the user
## test data samples format (decimal degree coordinates )
your latitude -> 8.9925
your longitude -> -168.6914
destination latitude -> 70
destination longitude -> 67

maximum ratelimit of 1000 requests in 15 minutes 




