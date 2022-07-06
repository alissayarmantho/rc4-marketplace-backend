const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');
const logger = require('morgan'); //for logging in console, the request message
const moment = require('moment-timezone');

const apiRouter = require('./routes/api.routes');
const app = express();
const server = require('http').createServer(app);

moment.tz.setDefault('Asia/Singapore');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

// connect to DB
const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to RC4 MarketPlace Backend Server REST API.' });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('404');
  next(createError(404, 'Invalid URL'));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  return res.json({
    message: err + ' is the error',
    data: {},
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
