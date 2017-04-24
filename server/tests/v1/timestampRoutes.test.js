var expect = require('expect');
var request = require('supertest');
var moment = require('moment');
var {app} = require('./../../server');

describe('GET /v1/timestamp', () => {
  var unix = moment().unix().valueOf();
  var natural = moment.unix(unix).format("MMMM D, YYYY");

  it('should return current date timestamp', (done) => {
    request(app)
      .get('/v1/timestamp')
      .expect(200)
      .expect((res) => {
        expect(res.body.unix).toEqual(unix);
        expect(res.body.natural).toEqual(natural);
      })
      .end(done);
  });
});

describe('GET /v1/timestamp/:timestamp', () => {
  it('should return unix and natural format date for valid unix timestamp', (done) => {
    var unix = 1450137600;
    var natural = moment.unix(unix).format('MMMM D, YYYY');

    request(app)
      .get(`/v1/timestamp/${unix}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.unix).toEqual(unix);
        expect(res.body.natural).toEqual(natural);
      })
      .end(done);
  });

  it('should return unix and natural date for valid natural date input', (done) => {
    var unix = moment().unix().valueOf();
    var natural = moment.unix(unix).format('MMMM D, YYYY');
    request(app)
      .get(`/v1/timestamp/${natural}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.natural).toEqual(natural);
      })
      .end(done);
  });

  it('should return null for invalid timestamp', (done) => {
    request(app)
      .get('/v1/timestamp/a123')
      .expect(400)
      .expect((res) => {
        expect(res.body.unix).toBe(null);
        expect(res.body.natural).toBe(null);
      })
      .end(done);
  });
});
