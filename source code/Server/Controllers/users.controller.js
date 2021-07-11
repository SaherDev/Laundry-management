exports.login = function (req, res) {
  var userInfo = req.body;
  try {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "admin",
    });
    connection.connect();
    connection.query(
      "SELECT * FROM laundrydb.users WHERE username = '" +
      userInfo.username +
      "'",
      function (err, result, fields) {
        if (err) {
          console.log(err);
          res.end(0);
        } else {
          if (result.length > 0) {
            if (userInfo.password == result[0].password) {
              require("crypto").randomBytes(48, function (err, buffer) {
                var token = buffer.toString("hex");
                connection.query(
                  "UPDATE laundrydb.users SET token = '" +
                  token +
                  "' WHERE userId = " +
                  result[0].userId
                );
                result[0].token = token;
                res.send(result);
                connection.end();
              });
            } else res.send({});
          } else res.send({});
        }
      }
    );
  } catch (e) {
    console.log(e.message);
    res.send({});
  }
};

exports.verifyToken = function (req, res) {
  var user = req.body;
  try {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "admin",
    });
    connection.connect();
    connection.query(
      "SELECT * FROM laundrydb.users WHERE token = '" + user.token + "'",
      function (err, result, fields) {
        if (err) {
          console.log(err);
          res.end(0);
        } else {
          if (result.length > 0) {
            res.send({ token: "valid" });
          } else res.send({ token: "invalid" });

        }
        connection.end();
      }
    );
  } catch (e) {
    res.send({});
  }
};
