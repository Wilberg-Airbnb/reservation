const express = require('express');
const app = express();
const db = require('../db/index.js');
const path = require('path');
const Promise = require('bluebird');

const promiseQuery = Promise.promisify(db.query).bind(db);

app.use(express.static(__dirname + '../../public'));
app.use(express.json());

app.get('/api/reservation/:listingId', (req, res) => {

  console.log("🥳 request data for listingId: ", req.params.listingId)
  var listingId = req.params.listingId;
  var query = `SELECT * FROM reservation INNER JOIN dates ON reservation.id = dates.reservation_id WHERE listingId = ${listingId}`

  promiseQuery(query)
    .then(data => {
      let availableDates = data.map(el => {
        return {date: el.availableDate, fee: el.fee}
      });
      let reservation = data[0];
      reservation.availableDates = availableDates;
      res.json(reservation);
    })
    .catch(err => {
      console.log('📅 promise query failed to get item data', err);
      res.sendStatus(500);
    })
})

app.get('/:listingId', (req, res) => {
  var itemPage = path.join(__dirname, '../public/index.html');
  res.sendFile(itemPage);
})

app.listen(8888, () => {
    console.log('server listening on port 8888!')
})