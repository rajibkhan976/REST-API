const express = require("express");

const routes = require("./routes");

const db = require("./models");

const app = express();

const port = process.env.PORT || 5000;

const session = require("express-session");

const cors = require("cors");

app.use(cors());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
  req.models = db.models;
  next();
});

app.use('/uploads', express.static('uploads'));

app.use('/', routes);

db.connectDb().then(() => {
  const listener = app.listen( port, () => {
    console.info(`Server is listening on port ${port}.`);
  });
}).catch((error) => {
  console.error(error);
});
