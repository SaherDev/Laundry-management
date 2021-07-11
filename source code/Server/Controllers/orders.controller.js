exports.create = function (req, res) {
  var newOrder = req.body;
  try {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "admin",
    });
    connection.connect();
    var json = "";
    connection.query("INSERT INTO laundrydb.orders SET ?", newOrder, function (err, result) {
      if (err) console.log(err);
    });
    connection.end();
    res.end(0);
  } catch (e) {
    console.log(e.message);
  }
};

exports.currentOrders = function (req, res) {
  try {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "admin",
    });
    connection.connect();
    var json = "";
    var query = "SELECT orderId,laundrydb.orders.clientId,Name as clientName,amount,DATE_FORMAT(dateIN,'%d/%m/%Y %H:%i') as dateIN,DATE_FORMAT(dateOUT,'%d/%m/%Y %H:%i') as dateOUT,status FROM laundrydb.orders join laundrydb.clients on laundrydb.orders.clientId=laundrydb.clients.clientId where status=0 or status=1 ORDER BY status ASC";
    connection.query(query, function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        //console.log("--->Find Current orders: \n" + JSON.stringify(results, null, 4));
        res.send(results);
      }
    });
    connection.end();
  } catch (e) {
    console.log(e.message);
  }
};

exports.update = function (req, res) {
  var id = parseInt(req.params.id);
  var updatedOrder = req.body;
  console.log(updatedOrder);

  try {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "admin",
    });
    connection.connect();
    var json = "";
    var query = "";
    if (updatedOrder.status == 1)
      query = "UPDATE laundrydb.orders SET status = 1 WHERE orderId = " + id;
    else if (updatedOrder.status == 2) query = "UPDATE laundrydb.orders SET status = 2 , dateOUT = '" + updatedOrder.dateOUT + "' WHERE orderId=" + id;

    connection.query(query, function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        console.log(
          "--->Update Successfully, order: \n" +
          JSON.stringify(updatedOrder, null, 4)
        );
      }
    });
    connection.end();
    res.end(0);
  } catch (e) {
    console.log(e.message);
  }
};
