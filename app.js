require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const { StatusCodes } = require('http-status-codes');
const path = require('path');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const User = require('./userModel');

const connectDB = require('./db/connect');

app.use(express.static(`${__dirname}/public`));

// Body parser
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Template Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).render('index', {
    msg: ''
  });
});

app.post('/thank-you', async (req, res) => {
  console.log(req.body);
  req.body.type = req.body.type === 'in-house' ? 'inHouse' : 'guest';

  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) {
    return res.status(StatusCodes.FORBIDDEN).render('index', {
      msg: 'Email is already registered'
    });
  }

  const user = await User.create(req.body);
  // console.log(user);
  res.status(StatusCodes.OK).render('thank-you', {
    name: 'kola'
  });
});

app.get('/thank-you', async (req, res) => {
  res.status(StatusCodes.OK).redirect('/');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    await connectDB(process.env.MONGO_URL_LOCAL);
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
