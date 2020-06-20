var faker = require('faker');
var _ = require('lodash');
var Promise = require('bluebird');
var fs = require('fs');

var promiseWrite = Promise.promisify(fs.writeFile);

var arr = [];

Promise.resolve(arr)
  .then(data => {
    for (var i = 0; i < 100; i++) {

      var price = faker.random.number({min: 35, max: 100});
    
      var listing = {
        "listingId": i,
        "standardPrice": price,
        "cleaningFee": Math.floor(price * 0.4),
        "weeklyDiscount": faker.random.objectElement({one: 0.10, two: 0.15, three: 0.20, four: 0.25}),
        "refundable": faker.random.boolean()
      };
    
      var numOfDates = faker.random.number({min: 150, max: 365});
      var currentPrice;
      var block = faker.random.number({min: 45, max: 90});
      var allDates = [];
    
      for (var d = 0; d < numOfDates; d++) {
        if (d % block === 0) {
          currentPrice = faker.random.objectElement({norm: price, low: Math.floor(price * .85), high: Math.floor(price * 1.15)});
        }
    
        allDates.push({"date": faker.date.between('2020-06-20', '2021-06-20'), "fee": currentPrice});
      }
    
      listing["availableDates"] = _.uniqBy(allDates, "date");
      // listing["availableDates"] = allDates;
    
      data.push(listing);
    }

    return data
  })
  .then(json => {
    return promiseWrite(__dirname + '/dummyData.txt', JSON.stringify(json))
  })
  .then(result => {
    console.log('all done!')
  })
  .catch(err => {
    console.log('generator failed: ', err);
  })





// fs.writeFile(__dirname + '/dummyData.txt', JSON.stringify(data), (err) => {
//   if (err) {
//     console.log('fuck we failed');
//   } else {
//     console.log('oh shit we did it!')
//   }
// })