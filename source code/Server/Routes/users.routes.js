module.exports = function (app) {

  var users = require('../controllers/users.controller.js');

  // Login
  app.post('/api/users', users.login);

  //Verify Token
  app.post('/api/users/token', users.verifyToken);

}
