const Cart = require("../model/Cart");

module.exports = {
  addCart: async (req, res) => {
    const { userId, cartItem, quantity } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.products.push({ cartItem, quantity });
          res.status(200).json("Product added to cart");
        }

        await cart.save();
      } else {
        const newCart = new Cart({
          userId,
          products: [
            {
              cartItem,
              quantity: quantity,
            },
          ],
        });
        await newCart.save();
        await res.status(201).json("Product added to cart");
      }
      await res.status(201).json("Product added to cart");
    } catch (error) {
      await res.status(500).json(error);
    }
  },

  getCart: async (req, res) => {
    const userId = req.params.id;
    try {
      const cart = await Cart.find({ userId }).populate(
        "products.cartItem",
        "_id title suplier price imageUrl"
      );

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItemId;
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { "products._id": cartItemId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true }
      );

      if (!updatedCart) {
        res.status(404).json({ message: "Cart item not found" });
      }

      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  decreaseCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        res.status(404).json({ message: "no cart found" });
      }

      const existingProduct = cart.products.find(
        (product) => product.cartItem.toString() === cartItem
      );
      if (!existingProduct) {
        res.status(404).json({ message: "no product found" });
      }
      if (existingProduct.quantity === 1) {
        cart.products = cart.products.filter(
          (product) => product.cartItem.toString() !== cartItem
        );
      } else {
        existingProduct.quantity -= 1;
      }

      await cart.save();

      if (existingProduct.quantity === 0) {
        await Cart.updateOne({ userId }, { $pull: { products: { cartItem } } });
      }

      await res.status(200).json("Product descremented");
    } catch (error) {
      await res.status(500).json("Something went wrong");
    }
  },
};
