import { Meal } from "../models/mealModel.js";
import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";

export const placeOrder = async (req, res, next) => {
  try {
    const { items, customerId } = req.body;
    let total = 0;
    for (const item of items) {
      const product = await Meal.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product with ID ${item.productId} not found` });
      } else if (product.available < item.quantity) {
        return res
          .status(400)
          .json({ error: `Not enough stock for product ${product.name}` });
      }
      total += product.price * item.quantity;
      product.available -= item.quantity;
      await product.save();
    }
    const newOrder = new Order({
      items,
      customerId,
      total: total,
      status: "Pending",
    });
    await newOrder.save();
    res.status(201).json({
      newOrder,
      success: true,
      message: "Successfully placed an order",
    });
    const user = await User.findById(customerId);
    user.orders.push(newOrder._id);
    await user.save();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `@Order:Internal Server Error: ${err}` });
  }
};
