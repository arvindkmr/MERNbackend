import express from 'express';
import {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updateProfile,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUserRole,
  updatePassword
} from '../controllers/userController.js';

import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/logout', logout);
userRoute.get('/me', isAuthenticatedUser, getUserDetails);
userRoute.put('/me/update', isAuthenticatedUser, updateProfile);

userRoute.put('/password/update', isAuthenticatedUser, updatePassword);

userRoute.get(
  '/admin/users',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getAllUser
);

userRoute.get(
  '/admin/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getSingleUser
);
userRoute.put(
  '/admin/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  updateUserRole
);
userRoute.delete(
  '/admin/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  deleteUser
);

export default userRoute;
