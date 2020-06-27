const supertest = require('supertest');
const { app } = require('./index.js');
const request = supertest(app);

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

describe('/api/reservation/:listingId', () => {

  it('should respond with a JSON object and status of 200 if given a listingId', async (done) => {
    const res = await request.get('/api/reservation/45');

    expect(res.body).toBeDefined();
    expect(typeof res.body).toBe('object');
    expect(res.status).toBe(200);

    done()
  })

  it('should respond with a 404 for listingIds not within 0-99', async (done) => {
    const res = await request.get('/api/reservation/123');

    expect(res.status).toBe(404);

    done()
  })

  it('should respond with a 500 when server fails', async (done) => {
    const res = await request.get('/api/reservation/notAnId')

    expect(res.status).toBe(500);
    done()
  })

  it('should respond with a JSON object with availableDates & refundable boolean if given a listingId', async (done) => {
    const res = await request.get('/api/reservation/45');

    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty('availableDates');
    expect(typeof res.body.refundable).toBe('boolean');
    expect(res.status).toBe(200);

    done()
  })


})