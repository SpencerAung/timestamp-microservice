require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const consolidate = require('consolidate');
const assert = require('assert');
const _ = require('lodash');
const cookieParser = require('cookie-parser')

const {mongoose} = require('./db/mongoose');

const publicPath = path.join(__dirname + './../public');
const port = process.env.PORT;

var app = express();
var server = app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});



app.use(compression());
app.use(express.static(publicPath));

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('Timestamp');
});

app.use((req,res) => {
	res.status(404).send("Page Not Found.");
});

module.exports = { app };
