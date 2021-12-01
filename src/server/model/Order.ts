import { Order } from '@/src/types/Order';
import mongoose, { PaginateModel } from 'mongoose';

const OrderSchema = new mongoose.Schema<Order>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          slug: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
      validate: {
        validator: function (value: any) {
          return value.length > 0;
        },
      },
    },
    shippingDetails: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    price: {
      items: {
        type: Number,
        required: true,
      },
      shipping: {
        type: Number,
        required: true,
      },
      tax: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const OrderModel: PaginateModel<Order> =
  (mongoose.models.Order as PaginateModel<Order>) ||
  (mongoose.model<Order & mongoose.Document>(
    'Order',
    OrderSchema
  ) as PaginateModel<Order>);
