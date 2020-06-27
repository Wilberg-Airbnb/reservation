const supertest = require('supertest');
const { app } = require('./index.js');
const request = supertest(app);
const { db } = require('../db/index.js')

describe('/:listingId', () => {

  it('should serve static files at listingIds 0-99', async (done) => {

    const res = await request.get('/32')

    expect(res.status).toBe(200)
    expect(res.text).toContain('html')
    done()
  })

  it('should return a 404 error for any pages not at listingId 0-99', async (done) => {

    const res = await request.get('/100');
    expect(res.status).toBe(404);

    done()
  })

})