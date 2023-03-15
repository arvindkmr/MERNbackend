import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product Name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter description'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxLenght: [8, 'Price cannot exceed 5 character'],
  },
  images: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        default:"https://unsplash.com/photos/wQLAGv4_OYs"
        // required: true,
      },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, 'please enter Product category'],
  },
  stock: {
    type: Number,
    required: [4, 'stock cannot exceed 4 character'],
    default: 1,
  },
  reviews: [
    {
      name: {
        type: String,
        // required: true,
      },
      review:{
        type:String,
        // required: true,
      }
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Product = mongoose.model('Products', productSchema);
