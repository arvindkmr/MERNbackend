import { Product } from '../models/productModel.js';
import ApiFeatures from '../utils/apiFeatures.js';
import ErrorHandler from '../utils/errorHandler.js';
//create product - By admin Only
export const createProduct = async (req, res, next) => {
  
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//update product for Admin only
export const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler('product not found', 404));
  }
  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ sucess: true, product });
};

//Delete product for Admin only
export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler('product not found', 500));
  }
  await product.remove(id);
  res
    .status(200)
    .json({ sucess: true, message: 'product deleted successfully' });
};
//Get Single product details
export const singleProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler('product not found', 404));
  }

  res.status(200).json({ sucess: true, product });
};

//Get - To display all products to user
export const getAllProduct = async (req, res, next) => {
  let resultPerPage = 1000;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({ success: true, products, productsCount });
};

// Delete Review
export const deleteReview = async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
};

// Get All Reviews of a product
export const getProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

// Create New Review or Update the review
export const createProductReview = async (req, res, next) => {
  const { productId,review } = req.body;
  console.log(review,productId)
  const newreview = {
    user: req.user._id,
    name: req.user.name,
    review:review,
  };

  const product = await Product.findById(productId);
  
  product.reviews.push(newreview);

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

// Get All Product (Admin)
export const getAdminProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};