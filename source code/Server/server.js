const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");

  console.log(req.method);
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

app.use(express.json());

//Require routes
require("../Server/Routes/clients.routes.js")(app);
require("../Server/Routes/orders.routes.js")(app);
require("../Server/Routes/users.routes.js")(app);

app.listen(4201, "127.0.0.1", function () {
  console.log("Server now listening on 4201");
});
