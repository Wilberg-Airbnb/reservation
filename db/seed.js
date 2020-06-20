const fs = require('fs');
const Promise = require('bluebird');
const db = require('./index');

const readPromise = Promise.promisify(fs.readFile);
const promiseQuery = Promise.promisify(db.query).bind(db);

readPromise(__dirname + '/dummyData.txt', 'utf-8')
	.then(text => {
		return JSON.parse(text);
	})
	.then(json => {
		let listingInserts = json.map(listing => {
			let listingQuery = `INSERT INTO reservation (listingId, standardPrice, cleaningFee, weeklyDiscount, refundable) VALUES (${listing.listingId}, ${listing.standardPrice}, ${listing.cleaningFee}, ${listing.weeklyDiscount}, ${listing.refundable})`

			return promiseQuery(listingQuery)
				.then((results) => {
					console.log('reservation query success!', results);

					let dateInserts = listing.availableDates.map(date => {
						let dateQuery = `INSERT INTO dates (availableDate, fee, reservation_id) VALUES ('${date.date}', ${date.fee}, (SELECT id FROM reservation WHERE listingId = ${listing.listingId}))`;
						return promiseQuery(dateQuery);
					})

					return Promise.all(dateInserts);
				})
				.catch(err => {
					console.log('promsie query chain failed: ', err);
				})
		})

		return Promise.all(listingInserts);
	})
	.catch(err => {
		console.error('read promise chain failed', err);
	})