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
  res.status(StatusCodes.OK).render('index');
});

app.post('/thank-you', async (req, res) => {
  const user = await User.create(req.body);
  console.log(user);
  res.status(StatusCodes.OK).render('thank-you', {
    name: 'kola'
  });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
