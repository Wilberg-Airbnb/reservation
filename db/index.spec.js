
const db = require('../db/index.js')
const Promise = require('bluebird');

var promiseQuery = Promise.promisify(db.query).bind(db);

describe('reservation table', () => {
  it('should contain 100 listings', async (done) => {
    let query = `SELECT * FROM reservation`

    db.query(query, (err, results) => {
      if (err) { throw err }
      expect(results).toHaveLength(100);
      done();
    })
  })

  it('should return an empty array for invalid listingIds', async (done) => {
    let listingId = 100
    let query = `SELECT * FROM reservation INNER JOIN dates ON reservation.id = dates.reservation_id WHERE listingId = ${listingId}`

    db.query(query, (err, result) => {
      if (err) { throw err }
      expect(result).toHaveLength(0)
      done()
    })
  })

  it('should have more than 150 dates per listing', async (done) => {

    let allPromised = []

    for (var i = 0; i < 100; i++) {
      let listingId = i
      let query = `SELECT * FROM reservation INNER JOIN dates ON reservation.id = dates.reservation_id WHERE listingId = ${listingId}`

      allPromised.push(promiseQuery(query))
    }

    Promise.all(allPromised)
      .then(result => { 
        
        result.forEach(listing => {
          expect(listing.length).toBeGreaterThanOrEqual(150)
        })

        done();
      })
  })
})