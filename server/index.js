const express = require('express');
const app = express();
const db = require('../db/index.js');
const path = require('path');
const Promise = require('bluebird');
const { readdirSync } = require('fs');

const promiseQuery = Promise.promisify(db.query).bind(db);

app.use(express.static(__dirname + '../../public'));
app.use(express.json());

app.get('/api/reservation/:listingId', (req, res) => {

  if (req.params.listingId > 99 || req.params.listingId < 0) {
    res.sendStatus(404);
  }

  console.log("🥳 request data for listingId: ", req.params.listingId)
  var listingId = req.params.listingId;
  var query = `SELECT * FROM reservation INNER JOIN dates ON reservation.id = dates.reservation_id WHERE listingId = ${listingId}`

  promiseQuery(query)
    .then(data => {
      console.log('data coming back!')
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
      console.log('📅 promise query failed to get item data', err);
      res.sendStatus(500);
    })
})

app.get('/:listingId', (req, res) => {
  console.log('current page index: ', req.params.listingId)
  if (req.params.listingId > 99) {
    res.sendStatus(404);
  }
  var itemPage = path.join(__dirname, '../public/index.html');

  res.sendFile(itemPage);
})

module.exports.app = app;