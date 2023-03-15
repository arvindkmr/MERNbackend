import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  singleProduct,
  updateProduct,
  getAdminProducts,
  createProductReview,
  getProductReviews,
  deleteReview,
} from '../controllers/productController.js';
import { authorizeRoles, isAuthenticatedUser } from '../MiddleWare/auth.js';

const productRoute = express.Router();

productRoute.get('/products', getAllProduct);
productRoute.put('admin/product/:id', isAuthenticatedUser,authorizeRoles("admin"), updateProduct);
productRoute.delete(
  'admin/product/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  deleteProduct
  );
  productRoute.get('/product/:id', singleProduct);
  productRoute.get(
    '/admin/products',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    getAdminProducts
    );
    productRoute.post('/admin/product/new', isAuthenticatedUser,authorizeRoles('admin'), createProduct);

productRoute.post('/review', isAuthenticatedUser, createProductReview);

productRoute.get('/reviews', getProductReviews);
productRoute.delete('/reviews', isAuthenticatedUser, deleteReview);

export default productRoute;
