module.exports = function (app) {

  var clients = require('../controllers/clients.controller.js');

  // Retrieve all clients
  app.get('/api/clients', clients.findAll);

  app.put('/api/clients/:id', clients.finishOrderByClientId);

}
