import { Schema, model, Types } from 'mongoose';

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  products: [
    {
      product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Cancelled'],
    default: 'Pending',
  },
  transaction: {
    id: String,
    transactionStatus: String,
    bank_status: String,
    sp_code: String,
    sp_message: String,
    method: String,
    date_time: String,
  },
  phone: {
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
  }
}, {
  timestamps: true, 
});

export const Order = model('Order', OrderSchema);
