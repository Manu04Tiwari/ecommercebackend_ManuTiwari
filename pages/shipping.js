const bookShipment = async (orderDetails) => {
    const response = await fetch('/api/shipping/create-shipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderDetails }),
    });
    const data = await response.json();
    if (data.shipment) {
      alert('Shipment booked successfully!');
    } else {
      alert('Failed to book shipment');
    }
  };
  