import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    items: [{
        name: { type: String, required: true },
        productId: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
        quantity: { type: Number, default: 1 },
        itemAmount: { type: Number, required: true }, // before coupon
        discountAmount: { type: Number, default: 0 },  // discount on this item from coupon
        totalAmount: { type: Number, required: true },  // itemAmount - discountAmount
        appliedCoupon: { 
            code: { type: String },
            couponId: { type: Schema.Types.ObjectId, ref: 'Coupon' },
            discountAmount: { type: Number },
        }
    }],
    cartTotal: { type: Number, default: 0 },    // sum of itemAmount of all items
    totalDiscount: { type: Number, default: 0 }, // sum of all discount amounts
    finalAmount: { type: Number, default: 0 }   // cartTotal - totalDiscount
}, { timestamps: true });

const Cart = model('Carts', cartSchema, "carts");
export default Cart;