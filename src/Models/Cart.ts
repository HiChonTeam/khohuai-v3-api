import mongoose, { Schema, Document, SchemaOptions } from "mongoose";

interface CartItem {
    number: string,
    qty: string,
    qty_now: string;
    status: 'Available' | 'Empty' | 'SoldOut' | 'OutOfDate',
}

interface CartDocument extends Document {
    uid: string;
    mycart: CartItem[]
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
    id: {
        type: String
    },
    mycart: {
        type: Array
    }
}, options);

const Cart = mongoose.model<CartDocument>('cart', cartSchema);

export default Cart;
