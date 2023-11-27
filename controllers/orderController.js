const Order = require("../model/Order");

module.exports = {
  getUserOrder: async (req, res) => {
    const userId = req.params.id;
    try {
      const order = await Order.find({ userId })
        .populate({ path: "productId", select: "-desc -product_location" })
        .exec();
      if (!order) {
        res.status(404).json("Order not found");
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
