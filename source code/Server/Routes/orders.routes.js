module.exports = function (app) {

  var orders = require('../controllers/orders.controller.js');

  // Create a new order
  app.post('/api/orders', orders.create);

  // Retrieve current orders
  app.get('/api/orders', orders.currentOrders);

  // Update an order with Id
  app.put('/api/orders/:id', orders.update);
}
