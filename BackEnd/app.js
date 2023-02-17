const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');

const collegeRouter = require('./routes/collegeRoutes');
const userRouter = require('./routes/userRoutes');
const closingRankRouter = require('./routes/closingRankRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();
const cors = require('cors')

// SERVING STATIC FILES-------------------------------------
app.use(express.static(`${__dirname}/public`));

// 1.Middlewares -------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(morgan('dev'));
app.use(cors());
// to understand how works go to the github page of morgan and it  will have req,res,next same like our own middleware
// like dev there are others just use ' ' and wait vs code will show all available

// own middleware function
// this will be executed for all requested . Remember to alwys put next
app.use((req, res, next) => {
  console.log('Hello from the middleware👋👋');
  next();
});

// manipulating req with our own middleware
app.use((req, res, next) => {
  console.log("😎😎😎",req.body);
  req.simple = req.body;
  next();
});

// adding time to all req
// we used trhis in getAllTours
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// localhost:5000/

app.use('/api/v1/colleges', collegeRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/closingRank', closingRankRouter);
app.use('/api/v1/reviews',reviewRouter);


module.exports = app;
