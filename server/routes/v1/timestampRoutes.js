

var express = require('express');
var moment = require('moment');
var router = express.Router();


router.get('/', (req, res) => {
  var currentUnix = moment().unix().valueOf();
  var currentNatural = moment.unix(currentUnix).format("MMMM D, YYYY");

  res.send({
    unix: currentUnix,
    natural: currentNatural
  });
});

router.get('/:timestamp', (req, res) => {
  var timestamp = req.params.timestamp;
  var regUnix = /^\d*$/;

  if (regUnix.test(timestamp)) {
    var momentdate = moment.unix(timestamp);
  } else {
    var momentdate = moment(timestamp,
    'MMMM D, YYYY');

  }

  var unix = momentdate.unix().valueOf();

  var natural = (unix) ? moment.unix(unix).format('MMMM D, YYYY') : null;

  if (!unix && !natural) {
    res.status(400);
  }

  res.send({ unix, natural});
});

module.exports = router;
