const sendLowStockAlert = require('./utils/lowStockAlert');


const testItem = {
  productName: 'Test Product',
  quantity: 2,
  threshold: 5
};

sendLowStockAlert(testItem);
