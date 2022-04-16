import mongoose, { Schema, Document, SchemaOptions } from "mongoose";

interface CartItem {
    number: string,
    qty: number,
    qty_now: string;
    status: 'Available' | 'Empty' | 'SoldOut' | 'OutOfDate',
}

interface CartDocument extends Document {
    uid: string;
    total: number;
    all_items: CartItem[]
}

const options: SchemaOptions = {
    toJSON: {
        transform(doc, ret) {
            delete ret.uid
            delete ret._id,
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
}

const cartSchema = new Schema({
    uid: {
        type: String
    },
    total: { 
        type: Number
    },
    all_items: {
        type: Array
    }
}, options);

const Cart = mongoose.model<CartDocument>('cart', cartSchema);

export default Cart;
