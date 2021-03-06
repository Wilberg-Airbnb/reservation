const express = require('express');
const app = express();
const db = require('../db/index.js');
const Promise = require('bluebird');
const compression = require('compression');

const promiseQuery = Promise.promisify(db.query).bind(db);
//middleware for sending 404 for invalid listingIds
app.use('/:listingId/', (req, res, next) => {
  console.log('', req.params.listingId)
  if (req.params.listingId > 99 || req.params.listingId < 0) { 
    res.sendStatus(404);
  }
  next()
})
//middleware for CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//serve static files at listing sub collection
app.use('/:listingId/', express.static(__dirname + '../../public'));
app.use(express.json());
app.use(compression({
  level: 2
}));

//GET API route for listing data (called once componentDidMount & getData is called)
app.get('/api/reservation/:listingId', (req, res) => {
  var listingId = req.params.listingId; 
  
  if (listingId > 99 || listingId < 0) { 
    res.sendStatus(404);
  }
  //create database query for valid listingIds
  console.log("🥳 request data for listingId: ", req.params.listingId)
  var query = `SELECT * FROM reservation INNER JOIN dates ON reservation.id = dates.reservation_id WHERE listingId = ${listingId}`

  promiseQuery(query)
    .then(data => {
      console.log('data coming back!')
      //successful query sends listing data on response
      let availableDates = data.map(el => {
        return {date: el.availableDate, fee: el.fee}
      });
      let reservation = data[0];
      reservation.availableDates = availableDates;
      reservation.refundable = !!reservation.refundable;
      // console.log(reservation);
      res.json(reservation);
    })
    .catch(err => {
      //failed queries to database send back 500 status
      console.log('📅 promise query failed to get item data', err);
      res.sendStatus(500);
    })
})

module.exports.app = app; 