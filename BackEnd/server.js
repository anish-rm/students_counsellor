const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

// // connecting put the url here
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  //After connecting it will return a promise
  .then(() => {
    console.log('DB connection successful');
  });


const port = 7000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
