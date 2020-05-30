module.exports = class CarsController {
  //constructor
  constructor(app) {
    //fields
    this.app = app;
    this.connection =
      "Go to MongoDB.com...create a free account... cluster and db ... setup password and ip address to all ip's .... and paste the connection here.... (choose option 2 => Mongo Driver!) ";
    this.mongoose = require("mongoose");
    //methods
    this.dbConnect();
    this.dbModels();
    //this.dbPopulate();
    this.initRoutes();
  }

  //Connect to DB
  dbConnect() {
    this.mongoose
      .connect(this.connection, {
        useUnifiedTopology: true, //Very important for new mongo version
        useNewUrlParser: true, //Very important for new mongo version
      })
      .then(() => console.log("DB Connected!"))
      .catch((err) => {
        console.log(`DB Connection Error: ${err.message}`);
      });
  }

  //Initialise any models
  dbModels() {
    this.car = this.mongoose.model(
      "car", // name of collection in db => will be pluaralised by default ....
      new this.mongoose.Schema(require("../models/car").car)
    );
  }

  //Populate some dummy data in db ... run once ...
  dbPopulate() {
    let cars = [
      this.car({ car: "Ferrari 308" }),
      this.car({ car: "Ferrari 458" }),
      this.car({ car: "Ferrari Enzo" }),
    ];
    cars.forEach((c) => {
      c.save((err, data) => {
        if (err) throw err;
        console.log(data);
      });
    });
  }

  //Initialise Routes
  initRoutes() {
    this.app.get("/", (req, res) => {
      this.car.find({}, (err, data) => {
        if (err) throw err;
        res.render("cars", { data: data });
      });
    });
    this.app.post("/", (req, res) => {
      let newCar = this.car(req.body);
      newCar.save((err, data) => {
        if (err) throw err;
        res.render("cars", { data: data });
      });
    });
    this.app.delete("/", (req, res) => {
      this.car.findByIdAndDelete(req.body.id, (err, data) => {
        if (err) throw err;
        res.render("cars", { data: data });
      });
    });
  }
};
