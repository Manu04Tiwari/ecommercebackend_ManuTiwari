exports.createCoupon = async (req, res) => {
    const { code, discount, expiryDate } = req.body;
    try {
      const coupon = new coupon({ code, discount, expiryDate });
      await coupon.save();
      res.status(200).json({ message: 'Coupon created successfully', coupon });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create coupon' });
    }
  };
  
  exports.validateCoupon = async (req, res) => {
    const { code } = req.body;
    try {
      const coupon = await Coupon.findOne({ code, expiryDate: { $gte: new Date() } });
      if (coupon) {
        res.status(200).json({ valid: true, discount: coupon.discount });
      } else {
        res.status(400).json({ valid: false, message: 'Invalid or expired coupon' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to validate coupon' });
    }
  };
  