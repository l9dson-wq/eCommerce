const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const PORT = process.env.PORT || 5000;

const connectDB = require("./models/dbConnection");

app.use(session({
  secret: "programmer cat",
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(expressLayouts);

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use("/", require("./router"));

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});

connectDB();