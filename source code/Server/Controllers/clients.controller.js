exports.findAll = function (req, res) {
  try {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "admin"
    });
    connection.connect();
    var json = "";
    var query = "SELECT * FROM laundrydb.clients";
    connection.query(query, function (err, results, fields) {
      if (err) {
        res.send(err);
      }
      else {
        //console.log("--->Find All: \n" + JSON.stringify(results, null, 4));
        res.send(results);
      }
    });
    connection.end();

  } catch (e) {
    console.log(e.message);
  }
};

exports.finishOrderByClientId = function (req, res) {
  var id = parseInt(req.params.id);
  try {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "admin",
    });
    connection.connect();
    var query = "UPDATE laundrydb.orders SET status = 2 WHERE status < 2 AND clientId = " + id;
    connection.query(query, function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        console.log("--->Update Successfully. \n");
      }
    });
    connection.end();
    res.end(0);
  } catch (e) {
    console.log(e.message);
  }
};
