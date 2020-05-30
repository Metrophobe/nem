//Server
const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

//Server
const app = express();

//Server Config
app.use(express.static(path.join(__dirname, "assets")));
app.use(expressLayouts); //for layouts and includes
//app.use(bodyParser.urlencoded({ extended: false })); //for forms
app.use(bodyParser.json()); // for json of course

//views ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Controllers
const carsController = new (require("./controllers/cars-controller"))(app);

//Use this for debugging purposes only!
app.use("/", (req, res, next) => {
  console.log(req.url);
  next();
});

//Run
app.listen(3000, () => {
  console.log("server started on port 3000");
});
