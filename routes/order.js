const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.get("/:id", orderController.getUserOrder);

module.exports = router;
