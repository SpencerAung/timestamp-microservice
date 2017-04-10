require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const compression = require('compression');
const consolidate = require('consolidate');
const assert = require('assert');
const _ = require('lodash');
const cookieParser = require('cookie-parser')


const {passport} = require('./authenticate/passport');
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

app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
	secret: process.env.SECRET,
	cookie: {maxAge: 3600000 },
	store: new MongoStore({url: process.env.MONGODB_URI}),
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/* initialize database */
require('./db/seed');

app.get('/', (req, res) => {
  res.send('Node Boilerplate');
});

app.use((req,res) => {
	res.status(404).send("Page Not Found.");
});

module.exports = { app };
