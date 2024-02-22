import { User } from "../models/userModel.js";

export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(201).json({ user });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "@Users:Internal Server Error" });
  }
};

export const addItem = async (req, res, next) => {
  try {
    const customerId = req.params.userId;
    const productId = req.body.productId;
    const user = await User.findById(customerId);
    const existingItem = user.cartItems.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      user.cartItems.push({ productId, quantity: 1 });
    }

    await user.save();
    res.status(200).json({ message: "Added item" });
    console.log("Added item");
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "@Cart:Internal Server Error" });
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const user = await User.findById(userId);
    const existingItemIndex = user.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex !== -1) {
      user.cartItems.splice(existingItemIndex, 1);
      await user.save();
      res.status(200).json({ message: "Removed item" });
      console.log("Removed Item");
    } else {
      res.status(404).json({ message: "No such item was found" });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "@Cart:Internal Server Error" });
  }
};

export const saveUserItems = async (req, res, next) => {
  const { userId } = req.params;
  /** @type {Array} */
  const cartItems = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cartItems = [];
    await user.save();

    if (cartItems.length !== 0) {
      for (const item of cartItems) {
        user.cartItems.push(item);
        console.log(item);
      }
      await user.save();
      return res.status(200).json({ message: "Successfully saved items" });
    }
    return res.status(200).json({ message: "Successfully saved items" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "@Cart: Internal Server Error" });
  }
};
