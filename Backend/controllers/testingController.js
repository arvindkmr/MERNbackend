import { Order } from '../models/TestingModel.js';
//create product - By admin Only
export const createOrder = async (req, res, next) => {
  const {
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    orderItems,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    itemsPrice,
    user: req.user._id,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderItems,
    paymentInfo,
    paidAt: Date.now(),
  });
  res.status(201).json({
    success: true,
    order,
  });
};

// get Single Order
export const getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
};
// get logged in user  Orders
export const myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
};

// get all Orders -- Admin
export const getAllOrders = () => async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

// update Order Status -- Admin
export const updateOrder = () => async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400));
  }

  if (req.body.status === 'Shipped') {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
};

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
};

// delete Order -- Admin
export const deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
};
