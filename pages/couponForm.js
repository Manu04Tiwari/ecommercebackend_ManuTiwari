const applyCoupon = async (code) => {
    const response = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    if (data.valid) {
      alert(`Coupon applied! Discount: ${data.discount}%`);
    } else {
      alert(data.message);
    }
  };
  