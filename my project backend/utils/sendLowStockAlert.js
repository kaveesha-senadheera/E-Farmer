const nodemailer = require('nodemailer');
require('dotenv').config();

const sendLowStockAlert = async (item) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ALERT_RECEIVER,
      subject: `🔔 Low Stock Alert: ${item.itemName}`,
      html: `
        <h2>Low Stock Alert</h2>
        <p>The following item is low in stock:</p>
        <ul>
          <li><strong>Product ID:</strong> ${item.productId}</li>
          <li><strong>Name:</strong> ${item.itemName}</li>
          <li><strong>Category:</strong> ${item.category}</li>
          <li><strong>Current Stock:</strong> ${item.stock}</li>
          <li><strong>Restock Threshold:</strong> ${item.restockThreshold}</li>
          <li><strong>Price:</strong> LKR ${item.price}</li>
        </ul>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Low stock alert sent for ${item.itemName}`);
  } catch (error) {
    console.error('❌ Error sending low stock alert:', error);
  }
};

module.exports = sendLowStockAlert;
