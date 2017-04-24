

var express = require('express');
var moment = require('moment');
var router = express.Router();


router.get('/', (req, res) => {
  var currentUnix = moment().unix();
  var currentNatural = moment.unix(currentUnix).format("MMMM D, YYYY");

  res.send({
    unix: currentUnix,
    natural: currentNatural
  });
});

router.get('/:timestamp', (req, res) => {
  var timestamp = req.params.timestamp;
  var regUnix = /^\d*$/;

  try {

    if (regUnix.test(timestamp)) {
      var momentdate = moment.unix(timestamp);
    } else {
      var momentdate = moment(timestamp);
    }

    var unix = momentdate.unix();

    var natural = (unix) ? moment.unix(unix).format('MMMM D, YYYY') : null;

    res.send({ unix, natural});
  } catch (e) {

  }
});

module.exports = router;
