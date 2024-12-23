const axios = require('axios');

exports.createShipment = async (req, res) => {
  const { orderDetails } = req.body;
  try {
    const response = await axios.post(
      'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
      orderDetails,
      { headers: { Authorization: `Bearer ${process.env.SHIPROCKET_TOKEN}` } }
    );
    res.status(200).json({ shipment: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shipment' });
  }
};
