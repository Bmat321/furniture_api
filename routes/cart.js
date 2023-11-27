const router = require("express").Router();
const cartController = require("../controllers/cartController");

router.post("/", cartController.addCart);
router.get("/find/:id", cartController.getCart);
router.post("/quantity", cartController.decreaseCartItem);
router.delete("/:cartItemId", cartController.deleteCartItem);

module.exports = router;
