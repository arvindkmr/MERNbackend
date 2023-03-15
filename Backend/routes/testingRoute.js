import express from 'express';
import {
  createOrder,getSingleOrder,myOrders,getAllOrders,deleteOrder,updateOrder
} from '../controllers/testingController.js';
import { authorizeRoles, isAuthenticatedUser } from '../MiddleWare/auth.js';

const orderRoute = express.Router(); 

orderRoute.post('/order/new',isAuthenticatedUser,createOrder);


orderRoute.get('/order/:id', isAuthenticatedUser, getSingleOrder);

orderRoute.get('/orders/me', isAuthenticatedUser, myOrders);
orderRoute.get(
  '/admin/orders',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getAllOrders
);

orderRoute.put(
  '/admin/order/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  updateOrder
);
orderRoute.delete(
  '/admin/order/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  deleteOrder
);


export default orderRoute;
