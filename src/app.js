require("dotenv").config();
const express = require("express");
const cors = require("cors");
const welcomeNote = require('./helpers/welcomeNotes');
// const { sequelize } = require('./models');

// sequelize
//   .authenticate()
//   .then(() => {
//       console.log('=========== Connection has been established successfully. ===========');
//   })
//   .catch((err) => {
//       console.log(`=========== Unable to connect to the database: ${err.message} ===========`);
//   });

const app = express();

const port = process.env.PORT || 5678;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./routes'));

app.use('/', (req, res) => {
  const random = Math.floor(Math.random() * 10);
  res.status(200).json({
    message: 'Welcome!',
    note: 'figure out the next quote 😁',
    quote: welcomeNote[random],
  });
});

app.listen(port, () => console.log(`\n Server started on port ${port}`));
